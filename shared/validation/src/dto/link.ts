import { GeneratedIdSchema } from '../fields/user.js';
import { PseudoSchema } from '../fields/link.js';
import { z } from 'zod';

export const ValidateGeneratedIdDto = z.object({
  generatedId: GeneratedIdSchema,
});

export const CreateLinkRequestDto = z.object({
  targetGeneratedId: GeneratedIdSchema,
  pseudo: PseudoSchema,
});

export const RespondToLinkRequestDto = z.object({
  accept: z.boolean(),
  pseudo: PseudoSchema.optional(),
});

export type ValidateGeneratedIdDto = z.infer<typeof ValidateGeneratedIdDto>;
export type CreateLinkRequestDto = z.infer<typeof CreateLinkRequestDto>;
export type RespondToLinkRequestDto = z.infer<typeof RespondToLinkRequestDto>;
