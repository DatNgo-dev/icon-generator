import { TRPCError } from "@trpc/server";
import { z } from "zod"; // validate input
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
  // mutation is when you modify anything on the server (Backend)
  // query is when you read (get some data from the server) anything on the server (Backend)
  getIcons: protectedProcedure.query(({ ctx }) => {
    const icons = ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return icons;
  }),
});
