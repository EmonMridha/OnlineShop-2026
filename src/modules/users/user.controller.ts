import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { userService } from "./user.service.js";
import httpStatus from 'http-status'

// If a function is called in a variable then the variable holds things returned by the function not the function itself.
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload = await req.body; // getting the data from the req

    const result = await userService.createUser(payload);

    res.status(httpStatus.CREATED).json({
        message: "User Registered Successfully",
        success: true,
        data: result
    })
})

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload = await req.body;

    const { user, accessToken, refreshToken } = await userService.loginUser(payload);

    // sending the accessToken to cookies
    res.cookie('accessToken', accessToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 1000 * 6
        }
    )

    // sending the refreshToken to the cookies
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(httpStatus.OK).json({
        success: true,
        message: "User Logged in Successfully",
        data: { user, accessToken, refreshToken }
    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id
    const result = await userService.getMyProfile(userId as string);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Current user data retrieved successfully!",
        data: result
    })
})

export const userController = {
    createAdmin,
    loginAdmin,
    getMyProfile
}