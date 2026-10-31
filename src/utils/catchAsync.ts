import { NextFunction, Request, RequestHandler, Response } from "express";


// calling a function in a variable means the variable will hold the returned value by the function, not the function itself.
export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
                errorDetails: {
                    message: error.message
                }
            })
        }
    }
}