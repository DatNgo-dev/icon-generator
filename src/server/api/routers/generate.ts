import { z } from "zod"; // validate input

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
  // mutation is when you modify anything on the server (Backend)
  // query is when you read (get some data from the server) anything on the server (Backend)
  generateIcon: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      // ctx is the context of the request
      console.log("We are here", input.prompt);
      return {
        message: "success",
      };
    }),
});
