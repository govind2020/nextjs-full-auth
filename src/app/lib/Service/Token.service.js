import jwt from 'jsonwebtoken'

const AUTH = process.env.Auth_JWT || "FGJI"
const FORGET = process.env.FORGET_JWT || "FAJI"

export const Generationtoken = async(user)=>{
    const token = await jwt.sign({userId : user._id},AUTH ,{
        expiresIn : '2d'
    })
    return token;
}

export const VerifyToken = async (token, email) => {
    const verified = await jwt.verify(token, AUTH);
    return verified
}

export const GenerationForgettoken = async(user, email)=>{
    const token = await jwt.sign({userId:user._id},`${FORGET}${email}`,{
        expiresIn:'5h'
    })
    return token
}

export const VerifyForgetToken = async (token, email) => {
    const verified = await jwt.verify(token,`${FORGET}${email}`);
    return verified
}