import { z } from 'zod';

export const MobileIdSchema = z
  .string()
  .min(1, { message: 'Mobile ID is required.' })
  .nonempty({ message: 'Mobile ID cannot be empty.' })
  .trim();

export const PasswordSchema = z
  .number('Password expect number')
  .int({ message: 'Password must be an integer (no decimals).' })
  .refine((val) => val.toString().length === 5, {
    message: 'Password must be exactly 5 digits',
  });

export const GeneratedIdSchema = z
  .string()
  .min(1, { message: 'Generated ID is required.' })
  .nonempty({ message: 'Generated ID cannot be empty.' })
  .trim();

export const AvatarSchema = z.string().optional();
