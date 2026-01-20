export class AppError extends Error {
  statusCode?: number;
  code?: string;
  originalError?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    code?: string,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.originalError = originalError;
  }
}
