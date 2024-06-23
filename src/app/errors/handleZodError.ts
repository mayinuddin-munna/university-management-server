import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

export const handleZodError = (err: ZodError) => {
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    errorSource,
  };
};
