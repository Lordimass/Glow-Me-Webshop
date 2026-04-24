import Stripe from "stripe";
import { configDotenv } from "dotenv";

const dotenvConfigOutput = configDotenv({ path: ".env.secret" });
const STRIPE_SECRET_KEY =
  dotenvConfigOutput.parsed?.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY does not exist!");
}
export let stripe: Stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia",
});
