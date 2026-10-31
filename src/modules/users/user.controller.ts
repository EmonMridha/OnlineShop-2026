import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { userService } from "./user.service.js";
import httpStatus from 'http-status'

// If a function is called in a variable then the variable holds things returned by the function not the function itself.
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload = await req.body; // getting the data from the req

    const result = await userService.createAdmin(payload);

    res.status(httpStatus.CREATED).json({
        message: "Admin Registered Successfully",
        success: true,
        data: result
    })
})

export const userController = {
    createAdmin
}