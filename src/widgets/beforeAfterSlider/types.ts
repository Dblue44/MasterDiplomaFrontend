import {z} from "zod";

export const BeforeAfterSliderPropsSchema = z.object({
  beforeSrc: z.string(),
  afterSrc: z.string(),
  className: z.string().nullable(),
  width: z.string().nullable(),
  height: z.string().nullable(),
})

export type BeforeAfterSliderProps = z.infer<typeof BeforeAfterSliderPropsSchema>
