import { z } from 'zod';

const configSchema = z.object({
  API_URL: z.string().url(),
  WS_URL: z.string(),
  APP_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
});

export const parseConfig = (configObj: Record<string, unknown>) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
