import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";

// Generate post
// POST /api/posts/generate
export const generatePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { prompt, tone, generateImage } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res
        .status(400)
        .json({
          message:
            "Gemini API Key is missing. Please add it to your server/.env file.",
        });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Generate Text
    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ``,
    });
  } catch (error) {}
};

// Get generations
// POST /api/posts/generations
export const getGenerations = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {};

// Schedule post
// POST /api/posts/
export const getPosts = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {};
