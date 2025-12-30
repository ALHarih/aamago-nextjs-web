// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

console.log("[Sanity Live] Token available:", !!token);
console.log("[Sanity Live] Token length:", token?.length || 0);

if (!token) {
  console.error(
    "[Sanity Live] Available SANITY env vars:",
    Object.keys(process.env).filter((key) => key.includes("SANITY"))
  );
  console.warn(
    "[Sanity Live] Missing SANITY_API_READ_TOKEN - some features may not work."
  );
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});

