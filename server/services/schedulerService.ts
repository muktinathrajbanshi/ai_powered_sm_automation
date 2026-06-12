import cron from "node-cron";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";

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
          const accounts = await Account.find({
            user: post.user,
            platform: { $in: post.platforms },
            status: "connected",
            zernioAccountId: { $exists: true },
          });

          if (accounts.length === 0) {
            console.log(
              `No connected Zernio accounts found for post ${post._id}`,
            );
            continue;
          }
        } catch (error) {}
      }
    } catch (error) {}
  });
};
