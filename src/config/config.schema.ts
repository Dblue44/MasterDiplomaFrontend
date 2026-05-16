import { z } from 'zod';

const configSchema = z.object({
  API_URL: z.string().url(),
  WS_URL: z.string(),
  APP_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  IP_RESTRICTION_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  ALLOWED_IP: z.string().optional().default(''),
});

export const parseConfig = (configObj: Record<string, unknown>) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
