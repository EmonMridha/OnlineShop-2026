import { SignOptions } from "jsonwebtoken";
import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import { jwtUtils } from "../../utils/jwt.js";
import { IAdmin } from "./user.interface.js";
import bcrypt from 'bcrypt'

// creating user
const createUser = async (payload: IAdmin) => {
    const { name, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const isExists = await prisma.user.findUnique({
        where: { email }
    })

    if (isExists) {
        throw new Error('This user already exists. Login instead')
    } // when error will be thrown the returned promise will be rejected and the following code will not be executed

    // creating admin in database
    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })

    const user = await prisma.user.findUnique({
        where: { email },
        omit: { passwordHash: true }
    })

    return user
}

// user login
const loginUser = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    if (!user) {
        throw new Error("user does not exists, Please register first")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordMatched) {
        throw new Error('Password is incorrect')
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
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

    return { user, accessToken, refreshToken };
}

const getMyProfile = async (userId: string) => {
    const result = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        omit: { passwordHash: true }
    })

    return result
}

export const userService = {
    createUser,
    loginUser,
    getMyProfile
}