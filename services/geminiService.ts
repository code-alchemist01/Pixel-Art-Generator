
import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";
import { IMAGE_GENERATION_MODEL } from '../constants';

// Ensure API_KEY is available. In a real app, this would be set in the environment.
// For this context, we assume process.env.API_KEY is available.
// If process.env or process.env.API_KEY is undefined, this will throw an error at initialization.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is not set in process.env. Please ensure it's available.");
  // To make the app usable in environments where API_KEY might not be immediately available
  // (like a static deployment without server-side env vars),
  // we throw an error here that will be caught by the UI.
  // This avoids crashing the entire script if GoogleGenAI constructor fails.
}

let ai: GoogleGenAI | null = null;
try {
    if(apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    // The error will propagate, or subsequent calls will fail if ai is null.
}


export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. Check API Key.");
  }
  if (!prompt || prompt.trim() === "") {
    throw new Error("Prompt cannot be empty.");
  }

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: IMAGE_GENERATION_MODEL,
      prompt: prompt,
      config: { 
        numberOfImages: 1, 
        outputMimeType: 'image/png' // PNG is often better for pixel art
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No image was generated. The prompt might be too restrictive or unclear.");
    }

    const image = response.generatedImages[0];
    if (!image || !image.image || !image.image.imageBytes) {
      throw new Error("Generated image data is incomplete or missing.");
    }
    
    const base64ImageBytes: string = image.image.imageBytes;
    return `data:image/png;base64,${base64ImageBytes}`;

  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    if (error instanceof Error) {
      // Check for specific error messages if needed, e.g., related to API key or quota
      if (error.message.includes("API key not valid")) {
         throw new Error("Invalid API Key. Please check your configuration.");
      }
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
