import { Request, Response } from "express";
import zernio from "../config/zernio.js";
import { User } from "../models/User.js";

// Helper to ensure user has a Zernio Profile.
const getOrCreateZernioProfile = async (user: any): Promise<string> => {
  try {
    const result = await zernio.profiles.listProfiles();
    const data = result.data as any;
    const profiles: any[] = Array.isArray(data)
      ? data
      : data?.profiles || data?.data || [];

    if (profiles.length > 0) {
      const pid = profiles[0]._id || profiles[0]._id;
      await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
      return pid;
    }
  } catch (error) {}
};

// Generate OAuth authorization URL
// GET /api/auth/:platform
export const generateAuthUrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { platform } = req.params;
  } catch (error) {}
};
