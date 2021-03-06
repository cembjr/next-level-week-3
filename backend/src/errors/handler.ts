import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler = (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    console.log({ message: "Validation fails", errors });
    
    return response.status(400).json({ message: "Validation fails", errors });
  }

  console.log(error);
  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
