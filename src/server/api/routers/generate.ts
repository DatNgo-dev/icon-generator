import { TRPCError } from "@trpc/server";
import { z } from "zod"; // validate input
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { url } from "inspector";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "ap-southeast-2",
});

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_OPENAI_API_KEY === "true") {
    return b64Image;
  } else {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    return response.data.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  // mutation is when you modify anything on the server (Backend)
  // query is when you read (get some data from the server) anything on the server (Backend)
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // ctx is the context of the request
      // TODO: verify the use has enough credits
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You don't have enough credits",
        });
      }

      const base64EncodedImage = await generateIcon(input.prompt);

      // Write to our icon table
      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });

      // Save the image (b64) to the database (S3)
      await s3
        .putObject({
          Bucket: "icon-generator-dat",
          Body: Buffer.from(base64EncodedImage!, "base64"),
          Key: icon.id, // generate a random id
          ContentEncoding: "base64",
          ContentType: "image/png",
        })
        .promise();

      return {
        message: "success",
        imageUrl: base64EncodedImage,
      };
    }),
});
