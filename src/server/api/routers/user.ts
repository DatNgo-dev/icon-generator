import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // mutation is when you modify anything on the server (Backend)
  // query is when you read (get some data from the server) anything on the server (Backend)
  getCredits: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user?.credits;
  }),
});
