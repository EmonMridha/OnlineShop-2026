import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
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

    const result = await prisma.admin.findUniqueOrThrow({
        where: { email },
        omit: { passwordHash: true }
    })

    return result;

}

export const userService = {
    createAdmin,
    loginAdmin
}