import { ZodIssue, ZodError } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
const handleValidationZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors,
  };
};
export default handleValidationZodError;
