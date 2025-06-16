import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";

export const validate = <T = any>(
  schema: Schema<T>,
  source: keyof Pick<Request, "body" | "query" | "params"> = "body",
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const { error, value } = schema.validate(data, { abortEarly: false });

      if (error) {
        const messages = error.details
          .map((d) => d.message.replace(/"/g, ""))
          .join(", ");

        // NOTE: turn into AppError
        throw new Error(`Validation error: ${messages}`);
      }

      req[source] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};
