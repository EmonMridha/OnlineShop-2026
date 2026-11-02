import { Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync.js"
import { Role } from "../modules/users/user.interface.js"
import { jwtUtils } from "../utils/jwt.js"
import config from "../config/index.js"
import { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma.js"

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: Function) => {
        const accessToken = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization // getting accessToken from cookies or headers

        if (!accessToken) {
            throw new Error("Your are not logged in. Please login first")
        }

        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

        if (!verifiedToken.success) {
            throw new Error("Problem occurred while verifying token")
        }

        const { email, name, id, role } = verifiedToken.data as JwtPayload

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to access this route")
        }

        const user = await prisma.user.findUniqueOrThrow({
            where: { id },
            omit: { passwordHash: true }
        })

        // inserting token owner info into the request so that it can be used later
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: role
        };

        next();

    })
}