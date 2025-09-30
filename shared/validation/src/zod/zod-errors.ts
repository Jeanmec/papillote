import { ZodError } from 'zod';

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

function formatZodIssue(
  issue: ZodError['issues'][0],
  originalValue?: Record<string, unknown>
): string {
  let errorMessage = issue.message;
  const field = String(issue.path[0]);

  if (issue.code === 'invalid_type') {
    if (
      issue.path.length > 0 &&
      issue.path[0] &&
      typeof issue.path[0] === 'string'
    ) {
      const fieldKey = issue.path[0];
      const fieldExists = originalValue && fieldKey in originalValue;
      const fieldValue = originalValue?.[fieldKey];

      if (
        !fieldExists ||
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === ''
      ) {
        errorMessage = `Field: ${field} is required`;
      } else {
        errorMessage = `${field} expect ${issue.expected}`;
      }
    }
  }
  return errorMessage;
}

export function getZodErrorMessages(
  error: unknown,
  originalValue?: Record<string, unknown>
): string[] {
  if (!isZodError(error)) {
    return [];
  }

  return error.issues.map((issue) => formatZodIssue(issue, originalValue));
}
