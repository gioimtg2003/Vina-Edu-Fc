import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createInventoryTools } from "../tools";
import { createPaymentTool } from "../tools/paymentTool";
import { SystemMessage } from "@langchain/core/messages";

export function createCommerceAgent(model: ChatCloudflareWorkersAI, db: D1Database, bankAcc: string, bankName: string) {
    const tools = [
        ...createInventoryTools(db),
        ...createPaymentTool(db, bankAcc, bankName)
    ];

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "Bạn là trợ lý bán hàng của hệ thống VinaUAV.\n" +
            "Bạn có thể kiểm tra số lượng hàng hoá, giá hàng hoá và đặt hàng cho khách hàng.\n" +
            "Bạn luôn phải kiểm tra số lượng hàng hoá trước khi xác nhận đơn hàng."
        )
    });
}
