import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText, LanguageModel } from 'ai';
import { AI_SYSTEM_PROMPT } from "@/lib/constant";
import { createGroq } from '@ai-sdk/groq';

export const maxDuration = 30;

// ── Provider factories ───────────────────────────────────────────────────────

const qwenProvider = createOpenAI({
    baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.ALI_BABA!,
});

const geminiProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY!,
});

const groqProvider = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

// ── Supported models registry ────────────────────────────────────────────────

export type ModelId =
    | 'qwen-plus'
    | 'qwen-turbo'
    | 'qwen-max'
    | 'qwen3.6-flash'
    | 'gemini-2.0-flash'
    | 'gemini-3-flash-preview'
    | 'gemini-1.5-pro'
    | 'llama-3.1-8b-instant'
    | 'openai/gpt-oss-120b'

function resolveModel(modelId: ModelId): LanguageModel {
    switch (modelId) {
        // Qwen / Alibaba
        case 'qwen-plus':    return qwenProvider('qwen-plus');
        case 'qwen-turbo':   return qwenProvider('qwen-turbo');
        case 'qwen-max':     return qwenProvider('qwen-max');
        case 'qwen3.6-flash':     return qwenProvider('qwen3.6-flash');
        // Google Gemini
        case 'gemini-2.0-flash': return geminiProvider('gemini-2.5-flash');
        case 'gemini-3-flash-preview':   return geminiProvider('gemini-3-flash-preview');
        case 'gemini-1.5-pro':   return geminiProvider('gemini-1.5-pro');
        // Anthropic Claude
        case 'llama-3.1-8b-instant': return groqProvider('llama-3.1-8b-instant');
        case 'openai/gpt-oss-120b':  return groqProvider('openai/gpt-oss-120b');
        // Default fallback
        default: return qwenProvider('qwen-plus');
    }
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
    try {
        const { messages, modelId } = await req.json();

        const model = resolveModel((modelId as ModelId) ?? 'qwen-plus');
        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
            model,
            system: AI_SYSTEM_PROMPT,
            messages: modelMessages,
            maxOutputTokens: 100,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat error:', error);
        return new Response('Error generating response', { status: 500 });
    }
}