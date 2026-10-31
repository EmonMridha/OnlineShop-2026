import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import { IAdmin } from "./user.interface.js";
import bcrypt from 'bcrypt'

const createAdmin = async (payload: IAdmin) => {
    const { name, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    // creating admin in database
    const createAdmin = await prisma.admin.create({
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

export const userService = {
    createAdmin
}