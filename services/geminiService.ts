
import { GoogleGenAI } from "@google/genai";

// Fix: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  async sendMessage(message: string, history: { role: 'user' | 'assistant', content: string }[]) {
    try {
      // Fix: Use ai.models.generateContent directly with model name and content.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'user' ? 'user' : 'model', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: "You are the core AI OS assistant for Gemini OS v2.0. You are helpful, sleek, and high-tech. Your responses should be concise and sophisticated.",
        }
      });

      // Fix: Directly access the .text property (not a method) from the response.
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Network error: Connection to Neural Core lost.";
    }
  }
}

export const geminiService = new GeminiService();