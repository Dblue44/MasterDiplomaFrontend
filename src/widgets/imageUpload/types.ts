import {z} from "zod";

export const ImageUploadPropsSchema = z.object({
  onUploadSuccess: z.function().args(z.void()).returns(z.void()),
  onUploadError: z.function().args(z.string()).returns(z.void()).optional(),
})

export type ImageUploadProps = z.infer<typeof ImageUploadPropsSchema>
