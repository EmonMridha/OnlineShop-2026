import { RequestHandler } from "express";
import { ZodType } from "zod";

// If we call a function in a variable, the variable holds the returned value by the function not the function itself
export const validateRequest = (schema: ZodType): RequestHandler => {
    return (req, res, next) => {

        const result = schema.safeParse(req.body); // checking if the incoming request matches the schema

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues
            })
        }

        req.body = result.data;

        next();
    }
}