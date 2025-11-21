import {z} from "zod";

export const statusEnumSchema = z.object({
  guid: z.string(),
  status: z.enum(["queued", "running", "completed", "failed"]),
  error: z.string().optional(),
})

export type UpdateImageStatusType = z.infer<typeof statusEnumSchema>

export const imageSchema = z.object({
  guid: z.string(),
  name: z.string(),
  status: z.enum(["queued", "running", "completed", "failed"]),
  upscale: z.string(),
  processTime: z.string(),
})

export type ImageType = z.infer<typeof imageSchema>

export const postImageSchema = z.object({
  file: z.instanceof(File),
})

export type PostImageType = z.infer<typeof postImageSchema>

export const downloadImageListTypeSchema = z.object({
  guids: z.array(
    z.string(),
  ),
})

export type DownloadImageListType = z.infer<typeof downloadImageListTypeSchema>

export const imagesDataTypeSchema = z.object({
  blob: z.instanceof(Blob),
  filename: z.string(),
})

export type ImagesDataType = z.infer<typeof imagesDataTypeSchema>