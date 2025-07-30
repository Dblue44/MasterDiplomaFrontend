import {z} from "zod";

export const imageSchema = z.object({
  guid: z.string(),
  name: z.string(),
  status: z.string(),
  upscale: z.string(),
  processTime: z.string(),
})

export type ImageType = z.infer<typeof imageSchema>

export const postImageSchema = z.object({
  file: z.instanceof(File),
})

export type PostImageType = z.infer<typeof postImageSchema>