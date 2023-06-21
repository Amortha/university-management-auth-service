/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../../config';

import handleCastError from '../../errors/handleCastError';
import handleZodError from '../../errors/handleZodError';
import handleValidationError from '../../errors/handlevalidationError';
import { IGenericErrorMessage } from '../../interfaces/error';
import apiError from '../../errors/apiError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.log('globalErrorHandler', error);

  let statusCode = 500;
  let message = 'something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'validationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof apiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

// path