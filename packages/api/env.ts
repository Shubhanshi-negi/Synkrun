import { createEnv } from "@t3-oss/env-core";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const env = createEnv({
  server: {
    JUDGE_API_URL: z.string().url().optional(),
    JUDGE_API_TOKEN: z.string().min(1),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});

export function getJudgeApiUrl() {
  if (!env.JUDGE_API_URL) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message:
        "Code execution is not configured. Set JUDGE_API_URL to your judge service URL.",
    });
  }

  return env.JUDGE_API_URL;
}
