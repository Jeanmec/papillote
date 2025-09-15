import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = {};

        error.issues.forEach((issue) => {
          let errorMessage = issue.message;
          const field = String(issue.path[0]);
          if (issue.code === 'invalid_type') {
            if (issue.path.length > 0 && issue.path[0]) {
              if (!value[issue.path[0]]) {
                errorMessage = `Field: ${field} is required`;
              } else {
                errorMessage = `Field: ${field} expect ${issue.expected}`;
              }
            }
          }

          errors[field] = errorMessage;
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
