import { Hono } from "hono";

// Re-export the RAGWorkflow class so wrangler can discover it
export { InsertVectorWorkflow } from "./rag-workflow";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

export const EMBEEDING_MODEL = "@cf/baai/bge-m3"

// ──────────────────────────────────────────────
// GET / — Query the RAG pipeline
// ──────────────────────────────────────────────
app.get("/query", async (c) => {
  const question = c.req.query("text") || "What is the square root of 9?";

  // 1. Generate embedding for the user's question
  const embeddings = await c.env.AI.run(EMBEEDING_MODEL, {
    text: question,
  });
  const vectors = embeddings.data[0];

  // 2. Retrieve the most relevant vectors from Vectorize
  const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });

  let vecId: string | undefined;
  if (vectorQuery.matches && vectorQuery.matches.length > 0) {
    vecId = vectorQuery.matches[0].id;
  }

  // 3. Fetch the corresponding note text from D1
  let notes: string[] = [];
  if (vecId) {
    const query = "SELECT * FROM notes WHERE id = ?";
    const { results } = await c.env.DB.prepare(query).bind(vecId).run();
    if (results) {
      notes = results.map((vec) => (vec as { text: string }).text);
    }
  }

  // 4. Build context message from retrieved notes
  const contextMessage = notes.length
    ? `Context:\n${notes.map((note) => `- ${note}`).join("\n")}`
    : "";

  const systemPrompt =
    "When answering the question or responding, use the context provided, if it is provided and relevant.";

  // 5. Generate answer using Workers AI LLM with augmented context
  const modelUsed = "@cf/meta/llama-3-8b-instruct";
  const response = await c.env.AI.run(modelUsed, {
    messages: [
      ...(notes.length
        ? [{ role: "system" as const, content: contextMessage }]
        : []),
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: question },
    ],
  });

  c.header("x-model-used", modelUsed);
  return c.text(response.response ?? "No response generated");
});

// ──────────────────────────────────────────────
// POST /upload — Upload a file to R2, then trigger RAG Workflow
// ──────────────────────────────────────────────
app.post("/upload", async (c) => {
  const body = await c.req.parseBody();
  const file = body["file"];

  if (!file || !(file instanceof File)) {
    return c.json({ error: "Missing file in form data" }, 400);
  }

  // Generate a unique R2 key using Web Crypto
  const r2Key = `uploads/${crypto.randomUUID()}`;

  // Stream the file body into R2 — avoids buffering the whole file in memory
  const uploaded = await c.env.RAG_BUCKET.put(r2Key, file.stream(), {
    httpMetadata: { contentType: file.type || "text/plain" },
    customMetadata: { originalName: file.name },
  });

  console.log(uploaded)
  // Trigger the durable RAG Workflow to read from R2, split, embed, and store
  const instance = await c.env.RAG_WORKFLOW.create({ params: { r2Key } });

  return c.json(
    { message: "File uploaded", r2Key, workflowId: instance.id },
    201
  );
});

// ──────────────────────────────────────────────
// POST /notes — Ingest a new note via RAG Workflow (legacy inline text)
// ──────────────────────────────────────────────
app.post("/notes", async (c) => {
  const { text } = await c.req.json<{ text: string }>();

  if (!text) {
    return c.text("Missing text", 400);
  }

  // Store inline text in R2 so the workflow has a single ingestion path
  const r2Key = `notes/${crypto.randomUUID()}.txt`;
  await c.env.RAG_BUCKET.put(r2Key, text, {
    httpMetadata: { contentType: "text/plain" },
  });

  // Trigger the durable RAG Workflow
  await c.env.RAG_WORKFLOW.create({ params: { r2Key } });

  return c.text("Created note", 201);
});

// ──────────────────────────────────────────────
// DELETE /notes/:id — Remove a note and its vector
// ──────────────────────────────────────────────
app.delete("/notes/:id", async (c) => {
  const { id } = c.req.param();

  // Delete from D1
  const query = "DELETE FROM notes WHERE id = ?";
  await c.env.DB.prepare(query).bind(id).run();

  // Delete from Vectorize
  await c.env.VECTOR_INDEX.deleteByIds([id]);

  return c.body(null, 204);
});

// Global error handler
app.onError((err, c) => {
  console.error("Worker error:", err);
  return c.text(err.message, 500);
});

export default app;
