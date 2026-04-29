import {z} from "zod";

export const backendStatuses = z.enum(["queued", "running", "completed", "cancelled", "failed"])

export const statusEnumSchema = z.object({
  guid: z.string(),
  status: backendStatuses,
  error: z.string().optional(),
})

export type UpdateImageStatusType = z.infer<typeof statusEnumSchema>

export const imageSchema = z.object({
  guid: z.string(),
  name: z.string(),
  status: backendStatuses,
  upscale: z.string(),
  processTime: z.number(),
})

export type ImageType = z.infer<typeof imageSchema>

export const postImageSchema = z.object({
  file: z.instanceof(File),
})

export type PostImageType = z.infer<typeof postImageSchema>

export const postImageResponseSchema = z.object({
  guid: z.string(),
  name: z.string(),
  status: backendStatuses,
  upscale: z.string(),
})

export type PostImageResponseType = z.infer<typeof postImageResponseSchema>


export const imageListTypeSchema = z.object({
  guids: z.array(
    z.string(),
  )
})

export type ImageListType = z.infer<typeof imageListTypeSchema>

export const downloadImageListTypeSchema = z.object({
  guids: z.array(
    z.string(),
  ),
  needSave: z.boolean(),
})

export type DownloadImageListType = z.infer<typeof downloadImageListTypeSchema>

export const downloadOriginalImageTypeSchema = z.object({
  guid: z.string(),
})

export type DownloadOriginalImageType = z.infer<typeof downloadOriginalImageTypeSchema>

export const imagesDataTypeSchema = z.object({
  blob: z.instanceof(Blob),
  filename: z.string(),
})

export type ImagesDataType = z.infer<typeof imagesDataTypeSchema>

export const imagesPreviewDataTypeSchema = z.object({
  blobOriginal: z.instanceof(Blob),
  filenameOriginal: z.string(),
  blobResult: z.instanceof(Blob),
  filenameResult: z.string(),
})

export type ImagesPreviewDataType = z.infer<typeof imagesPreviewDataTypeSchema>

export const imagesCancelResultSchema = z.object({
  result: z.boolean(),
  error: z.string().optional(),
})

export type ImagesCancelResult = z.infer<typeof imagesCancelResultSchema>

export const originalImageRequestSchema = z.object({
  guid: z.string(),
})

export type OriginalImageRequest = z.infer<typeof originalImageRequestSchema>

export const imagePreviewPayloadSchema = z.object({
  urlOriginal: z.string(),
  filenameOriginal: z.string(),
  urlResult: z.string(),
  filenameResult: z.string(),
})

export type ImagePreviewPayload = z.infer<typeof imagePreviewPayloadSchema>

export const imageUrlPayloadSchema = z.object({
  url: z.string(),
  filename: z.string(),
})

export type ImageUrlPayload = z.infer<typeof imageUrlPayloadSchema>

export const taskStatusMapSchema = z.record(z.string(), backendStatuses)
export type TaskStatusMap = z.infer<typeof taskStatusMapSchema>

export const getTasksResponseSchema = z.array(taskStatusMapSchema)
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>
