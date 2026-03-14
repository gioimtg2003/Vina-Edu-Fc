import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { EMBEEDING_MODEL } from ".";

/**
 * RAGWorkflow — A durable Cloudflare Workflow that ingests a document into the RAG pipeline.
 *
 * Steps:
 *   0. Read the uploaded file from R2 using the provided key
 *   1. Split the text into chunks using RecursiveCharacterTextSplitter
 *   2. For each chunk:
 *      a. Insert into D1 `notes` table
 *      b. Generate vector embedding via Workers AI (@cf/baai/bge-m3)
 *      c. Upsert the embedding into Vectorize with the D1 row ID
 */

type RagParams = {
  r2Key: string;
};

export class InsertVectorWorkflow extends WorkflowEntrypoint<Env, RagParams> {
  async run(event: WorkflowEvent<RagParams>, step: WorkflowStep) {
    const { r2Key } = event.payload;
    const env = this.env;

    // Step 0: Read the uploaded file from R2
    const fileText = await step.do("read file from R2", async () => {
      const object = await env.RAG_BUCKET.get(r2Key);
      if (!object) {
        throw new Error(`File not found in R2: ${r2Key}`);
      }
      return object.text();
    });

    // Step 1: Split input text into manageable chunks
    const texts = await step.do("split text", async () => {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const output = await splitter.createDocuments([fileText]);
      return output.map((doc) => doc.pageContent);
    });

    // Step 2: Process each chunk — insert into DB, embed, and upsert vector
    for (const index in texts) {
      const chunkText = texts[index];

      // 2b. Generate vector embedding using Workers AI
      const embedding = await step.do(
        `generate embedding: ${index}/${texts.length}`,
        async () => {
          const embeddings = await env.AI.run(EMBEEDING_MODEL, {
            text: chunkText,
          });

          console.log(embeddings)
          const values = embeddings?.data?.[0];
          if (!values) throw new Error("Failed to generate vector embedding");
          return values;
        }
      );

      // 2c. Upsert the vector into Vectorize
      await step.do(`insert vector: ${index}/${texts.length}`, async () => {
        return env.VECTOR_INDEX.insert([
          {
            id: crypto.randomUUID(),
            values: embedding,
            metadata: {
              text: chunkText,
            }
          },
        ]);
      });
    }
  }
}
