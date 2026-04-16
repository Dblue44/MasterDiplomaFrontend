import {z} from "zod";
import {backendStatuses, imageSchema} from "@shared/api/image/types.ts";

export const imageTableMetaSchema = z.object({
  onEdit: z.function().args(z.string()).returns(z.void()),
  onSave: z.function().args(z.string()).returns(z.void()),
  onCancel: z.function().args(z.string()).returns(z.void()),
  onDelete: z.function().args(z.string()).returns(z.void()),
  onSaveMany: z.function().args().returns(z.void()),
  onCancelMany: z.function().args().returns(z.void()),
  onDeleteMany: z.function().args().returns(z.void()),
})

export type ImageTableMeta = z.infer<typeof imageTableMetaSchema>

export const imageActionsCellPropsSchema = z.object({
  guid: z.string(),
  status: backendStatuses,
  onEdit: z.function().args(z.string()).returns(z.void()),
  onSave: z.function().args(z.string()).returns(z.void()),
  onCancel: z.function().args(z.string()).returns(z.void()),
  onDelete: z.function().args(z.string()).returns(z.void()),
})

export type ImageActionsCellProps = z.infer<typeof imageActionsCellPropsSchema>

export const imageTableActionsSchema = z.object({
  selectedRows: z.array(imageSchema),
  onSaveMany: z.function().args().returns(z.void()),
  onCancelMany: z.function().args().returns(z.void()),
  onDeleteMany: z.function().args().returns(z.void()),
  isAnySelected: z.boolean()
})

export type ImageTableActionsProps = z.infer<typeof imageTableActionsSchema>