import { articleRouter } from "~/server/api/routers/article";
import { authRouter } from "~/server/api/routers/auth";
import { leaveRouter } from "~/server/api/routers/leave";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  article: articleRouter,
  leave: leaveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
