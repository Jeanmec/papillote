import { z } from 'zod';

export const createUserSchema = z.object({
  mobileId: z.string().min(1, { message: 'Mobile ID is required' }),
  password: z
    .number()
    .int()
    .min(10000, { message: 'Password must be at least 5 digits' })
    .max(99999, { message: 'Password must be at most 5 digits' }),
});
