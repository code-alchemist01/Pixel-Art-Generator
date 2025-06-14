
import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";
import { IMAGE_GENERATION_MODEL } from '../constants';

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is not set in process.env. Please ensure it's available.");
}

let ai: GoogleGenAI | null = null;
try {
    if(apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
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
        outputMimeType: 'image/png' 
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
      if (error.message.includes("API key not valid")) {
         throw new Error("Invalid API Key. Please check your configuration.");
      }
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
