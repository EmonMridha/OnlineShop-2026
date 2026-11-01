import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'


const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(payload, secret, { expiresIn } as SignOptions) // creating token and saving here

    return token
}

export const jwtUtils = {
    createToken
}