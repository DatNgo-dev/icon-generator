import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import Stripe from "stripe";

import { env } from "~/env.mjs";

const stripe = new Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // Track user in metadata
      metadata: {
        userId: ctx.session.user.id,
      },
      success_url: `${env.HOST_NAME}`,
      cancel_url: `${env.HOST_NAME}`,
      line_items: [{ price: env.PRODUCT_PRICE_ID, quantity: 1 }],
      mode: "payment",
    });
    return session;
  }),
});
