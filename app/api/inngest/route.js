import { serve } from "inngest/next";
import { helloWorld } from "@/lib/inngest/functions";
import { inngest } from "@/lib/inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    helloWorld,
  ],
});
