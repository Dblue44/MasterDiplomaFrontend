import {z} from "zod";

export const SubscribePayloadSchema = z.object({
  type: z.string().describe("subscribe"),
  guids: z.array(z.string()),
})

export type SubscribePayload = z.infer<typeof SubscribePayloadSchema>