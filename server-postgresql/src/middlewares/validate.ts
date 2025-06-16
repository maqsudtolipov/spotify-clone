import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "joi";
import { AppError } from "../errors/AppError";

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

        throw new AppError(`Validation error: ${messages}`, 422);
      }

      req[source] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};
