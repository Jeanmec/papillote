import {
  AvatarSchema,
  GeneratedIdSchema,
  MobileIdSchema,
  PasswordSchema,
} from '../fields/user.js';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  mobileId: MobileIdSchema,
  password: PasswordSchema,
});

export const ResetAccountSchema = z.object({
  mobileId: MobileIdSchema,
  password: PasswordSchema,
});

export const LoginSchema = z.object({
  mobileId: MobileIdSchema,
  password: PasswordSchema,
});

export const ClientSchema = z.object({
  generatedId: GeneratedIdSchema,
  avatar: AvatarSchema,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type ResetAccountDto = z.infer<typeof ResetAccountSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type ClientDto = z.infer<typeof ClientSchema>;
