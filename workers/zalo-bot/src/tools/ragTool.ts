import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Creates a RAG retrieval tool that embeds a query and searches Vectorize
 * for the top-K most relevant technical documentation chunks.
 *
 * @param ai        – Workers AI binding (`env.AI`)
 * @param vectorIndex – Vectorize binding (`env.VECTOR_INDEX`)
 */
export const createRagTool = (ai: Ai, vectorIndex: Vectorize) => {
    return tool(
        async ({ question }) => {
            try {
                // 1. Generate embedding for the user's question
                const embeddingResponse: any = await ai.run(
                    "@cf/baai/bge-base-en-v1.5",
                    { text: [question] }
                );

                const queryVector = embeddingResponse.data[0] as number[];

                // 2. Query the Vectorize index for the top 3 matches
                const searchResults = await vectorIndex.query(queryVector, {
                    topK: 3,
                    returnMetadata: "all",
                });

                const matches = searchResults.matches || [];

                if (matches.length === 0) {
                    return "Không tìm thấy tài liệu kỹ thuật liên quan. Hãy trả lời dựa trên kiến thức chung của bạn.";
                }

                // 3. Concatenate the text from matched metadata
                const context = matches
                    .map((match, idx) => {
                        const text =
                            (match.metadata as Record<string, unknown>)?.text ||
                            (match.metadata as Record<string, unknown>)?.content ||
                            "N/A";
                        const source =
                            (match.metadata as Record<string, unknown>)?.source || "unknown";
                        return `[${idx + 1}] (nguồn: ${source}, score: ${match.score.toFixed(3)})\n${text}`;
                    })
                    .join("\n\n---\n\n");

                return `Tài liệu kỹ thuật tham khảo:\n\n${context}`;
            } catch (error: any) {
                console.error("RAG search_technical_docs error:", error);
                return `Lỗi khi tìm kiếm tài liệu: ${error.message}. Hãy trả lời dựa trên kiến thức chung.`;
            }
        },
        {
            name: "search_technical_docs",
            description:
                "Tìm kiếm tài liệu kỹ thuật về drone, flight controller, phần cứng và firmware. " +
                "LUÔN gọi tool này trước khi trả lời các câu hỏi kỹ thuật về phần cứng hoặc firmware.",
            schema: z.object({
                question: z
                    .string()
                    .describe("Câu hỏi kỹ thuật của người dùng để tìm kiếm tài liệu liên quan."),
            }),
        }
    );
};
