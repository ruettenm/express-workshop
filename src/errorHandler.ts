import { ErrorRequestHandler } from "express";
import { isProduction } from "./environment";
import { logger } from "./logger";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public errorKey: string,
    message?: string
  ) {
    super(message || errorKey);
  }
}

export const defaultErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof NotFoundError) {
    res.status(404).send(error.message);
  } else if (error instanceof ForbiddenError) {
    res.status(403).send(error.message);
  } else if (error instanceof ApiError) {
    const { statusCode, errorKey, message } = error;
    res.status(statusCode).json({ errorKey, message });
  } else {
    next(error);
  }
};

export const handleEveryOtherError: ErrorRequestHandler = (
  error,
  req,
  res,
  _
) => {
  // pino's err serializer keeps type, message and stack in one single-line record.
  // req.log is set by pino-http; fall back to the shared logger (e.g. in unit tests).
  (req.log ?? logger).error({ err: error }, "request.failed");
  const message = isProduction() ? "Something went wrong." : error.message;
  res.status(500).send(message);
};
