import {z} from "zod";

export const imageTableMetaSchema = z.object({
  onEdit: z.function().args(z.string()).returns(z.void()),
  onSave: z.function().args(z.string()).returns(z.void()),
  onCancel: z.function().args(z.string()).returns(z.void()),
  onSaveAll: z.function().args().returns(z.void()),
  onCancelAll: z.function().args().returns(z.void()),
})

export type ImageTableMeta = z.infer<typeof imageTableMetaSchema>

export const imageActionsCellPropsSchema = z.object({
  guid: z.string(),
  completed: z.boolean(),
  onEdit: z.function().args(z.string()).returns(z.void()),
  onSave: z.function().args(z.string()).returns(z.void()),
  onCancel: z.function().args(z.string()).returns(z.void()),
})

export type ImageActionsCellProps = z.infer<typeof imageActionsCellPropsSchema>

export const imageTableActionsSchema = z.object({
  onSave: z.function().args().returns(z.void()),
  onCancel: z.function().args().returns(z.void()),
  isAnySelected: z.boolean()
})

export type ImageTableActionsProps = z.infer<typeof imageTableActionsSchema>