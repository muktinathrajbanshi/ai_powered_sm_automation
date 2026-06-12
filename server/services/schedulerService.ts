import cron from "node-cron";
import { Post } from "../models/Post.js";

export const initScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const postsToPublished = await Post.find({
        status: "scheduled",
        scheduleFor: { $lte: now },
      });

      for (const post of postsToPublished) {
        try {
        } catch (error) {}
      }
    } catch (error) {}
  });
};
