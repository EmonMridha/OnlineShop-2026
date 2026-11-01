import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'


const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(payload, secret, { expiresIn } as SignOptions) // creating token and saving here

    return token
}

// verifying jwt tokens and finding their owner data
const verifyToken = (token: string, secret: string) => {
    try {

        const verifiedToken = jwt.verify(token, secret); // finding the owner of the token and saving his data here

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token payload");
        }

        return {
            success: true,
            data: verifiedToken
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const jwtUtils = {
    createToken,
    verifyToken
}