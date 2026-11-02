import { RequestHandler } from "express";
import { ZodType } from "zod";

// If we call a function in a variable, the variable holds the returned value by the function not the function itself
export const validateRequest = (schema: ZodType): RequestHandler => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body); // checking if the incoming request.body matches the schema. and then if the req.body matches the schema it will return an object like this { success: true, data: The request.body  }

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues.map((issue) => issue.message)
            })
        }

        // saving the checked data into req.body
        req.body = result.data;

        next();
    }
}