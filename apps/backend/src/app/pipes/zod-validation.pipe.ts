import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';
import { getZodErrorMessages } from '@papillote/validation';

@Injectable()
export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = getZodErrorMessages(
          error,
          value as Record<string, unknown>
        );

        const errors: Record<string, string> = {};
        error.issues.forEach((issue, index) => {
          const field = String(issue.path[0]);
          errors[field] = errorMessages[index] || issue.message;
        });

        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors,
        });
      }
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
