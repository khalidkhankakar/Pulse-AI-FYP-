import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, streamText } from 'ai';
import { AI_SYSTEM_PROMPT } from "@/lib/constant";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const qwenModel = createOpenAI({
    baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.ALI_BABA!,
})

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const modelMessage = await convertToModelMessages(messages);
        const result = streamText({
            model: qwenModel('qwen-plus'),
            system: AI_SYSTEM_PROMPT,
            messages: modelMessage,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat error:', error);
        return new Response('Error generating response', { status: 500 });
    }
}