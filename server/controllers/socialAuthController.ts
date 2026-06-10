import { Request, Response } from "express";

// Generate OAuth authorization URL
// GET /api/auth/:platform
export const generateAuthUrl = async (
  req: Request,
  res: Response,
): Promise<string> => {
  try {
    const { platform } = req.params;
  } catch (error) {}
};
