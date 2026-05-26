import { sendGA4Event as LRCSendGA4Event } from "lordis-react-components";
import { configDotenv } from "dotenv";

const dotenvConfigOutput = configDotenv({ path: ".env.secret" });
const GA4_MEASUREMENT_PROTOCOL_SECRET =
  dotenvConfigOutput.parsed?.GA4_MEASUREMENT_PROTOCOL_SECRET ??
  process.env.GA4_MEASUREMENT_PROTOCOL_SECRET;
const GA4_MEASUREMENT_ID = process.env.VITE_GA4_MEASUREMENT_ID;

export async function sendGA4Event(payload: any, debug = false) {
  if (!GA4_MEASUREMENT_PROTOCOL_SECRET || !GA4_MEASUREMENT_ID) {
    throw new Error(
      "Missing required VITE_GA4_MEASUREMENT_ID or GA4_MEASUREMENT_PROTOCOL_SECRET",
    );
  }

  return LRCSendGA4Event(
    GA4_MEASUREMENT_PROTOCOL_SECRET,
    GA4_MEASUREMENT_ID,
    payload,
    debug,
  );
}
