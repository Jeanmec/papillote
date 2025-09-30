import { z } from 'zod';

export const AccessTokenSchema = z
  .string()
  .min(1, { message: 'Access token is required' })
  .nonempty({ message: 'Access token cannot be empty' });
