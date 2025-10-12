import z from 'zod';

export const PseudoSchema = z
  .string()
  .min(1, { message: 'Pseudo is required' })
  .min(3, { message: 'Pseudo must be at least 3 characters long' })
  .max(20, { message: 'Pseudo must be at most 20 characters long' })
  .regex(/^[a-zA-Z0-9 ]+$/, {
    message: 'Pseudo can only contain letters, numbers, and spaces',
  })
  .trim();
