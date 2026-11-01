import { SignOptions } from "jsonwebtoken";
import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import { jwtUtils } from "../../utils/jwt.js";
import { IAdmin } from "./user.interface.js";
import bcrypt from 'bcrypt'

// creating admin
const createAdmin = async (payload: IAdmin) => {
    const { name, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const isExists = await prisma.admin.findUnique({
        where: { email }
    })

    if (isExists) {
        throw new Error('This admin already exists. Login instead')
    } // when error will be thrown the returned promise will be rejected and the following code will not be executed

    // creating admin in database
    await prisma.admin.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })

    const user = await prisma.user.findUnique({
        where: { email },
        omit: { password: true }
    })

    return user
}

// admin login
const loginAdmin = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const admin = await prisma.admin.findUniqueOrThrow({
        where: { email },

    })

    if (!admin) {
        throw new Error("Admin does not exists, Please register first")
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.passwordHash)

    if (!isPasswordMatched) {
        throw new Error('Password is incorrect')
    }

    const jwtPayload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: "ADMIN"
    }

    // Creating Access token
    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )

    // Creating refresh token 
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return { admin, accessToken, refreshToken };

}

export const userService = {
    createAdmin,
    loginAdmin
}