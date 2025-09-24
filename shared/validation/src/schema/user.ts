import { z } from 'zod';

export const createUserSchema = z.object({
  mobileId: z
    .string()
    .min(1, { message: 'Mobile ID is required' })
    .nonempty({ message: 'Mobile ID cannot be empty' }),
  password: z
    .int({ message: 'Password must be an number' })
    .min(10000, { message: 'Password must be at least 5 digits' })
    .max(99999, { message: 'Password must be at most 5 digits' }),
});
