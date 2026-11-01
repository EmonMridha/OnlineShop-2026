import { NextFunction, Request, RequestHandler, Response } from "express";

// calling a function in a variable means the variable will hold the returned value by the function, not the function itself.
export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // when the any promise inside try block returns a rejected value the execution immediately leaves the try block and the catch block starts to execute. Then the rejection reason become available in the error.
        try {
            await fn(req, res, next);
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
                errorDetails: error.message
            })
        }
    }
} 
