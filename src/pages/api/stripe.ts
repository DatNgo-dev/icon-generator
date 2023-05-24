import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { buffer } from "micro";
import Stripe from "stripe";
import { prisma } from "~/server/db";

const stripe = new Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

// Need to include this for dealing with stripe webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    // get the signature from the header
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf, // req.body
        sig,
        env.STRIPE_WEB_HOOK_SECRET
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    // Handle the event - checkout.session.completed from stripe docs
    switch (event.type) {
      case "checkout.session.completed":
        const completedEvent = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };
        // Then define and call a function to handle the event checkout.session.completed
        await prisma.user.update({
          where: {
            id: completedEvent.metadata.userId,
          },
          data: {
            credits: {
              increment: 100,
            },
          },
        });
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
