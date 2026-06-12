import cron from "node-cron";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";

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
          const zernioPlatforms = accounts.map((acc) => ({
            tform: acc.platform as any,
            accountId: acc.zernioAccountId!,
          }));

          const payload = {
            content: post.content,
            publishNow: true,
            ...(post.mediaUrl
              ? {
                  mediaItems: [
                    { type: post.mediaType || "image", url: post.mediaUrl },
                  ],
                }
              : {}),
            platforms: zernioPlatforms,
          };
          console.log(
            `Publishing post ${post._id} to Zernio with media: ${post.mediaUrl || "none"}`,
          );

          const response = await zernio.posts.createPost({
            body: payload,
          });

          const publishedPost = (response.data as any)?.post || response.data;

          if (!publishedPost) {
            throw new Error("Failed to get post object from zernio response");
          }

          console.log(
            `Zernio post created: ${publishedPost._id || publishedPost.id}`,
          );

          post.status = "published";
        } catch (error) {}
      }
    } catch (error) {}
  });
};
