import { AccessTokenSchema } from '../fields/auth.js';
import z from 'zod';

export const LoginResponseSchema = z.object({
  access_token: AccessTokenSchema,
});

export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
