// npm i --save @stripe/stripe-js to allow stripe to work on the frontend
import { loadStripe } from "@stripe/stripe-js";
import { check } from "prettier";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

// helper hook that allow user to setup a session and redirect to stripe
export function useBuyCredits() {
  // hit the mutation endpoint
  const checkout = api.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      // invoking the mutation
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
