import jwt from "jsonwebtoken"

export const generateJWT = ({email, cookies}) => {
    const token = jwt.sign({ email }, import.meta.env.JWT_SECRET, { expiresIn: import.meta.env.JWT_EXPIRES_IN });

    cookies.set(process.env.COOKIE_NAME, token, { path: "/", expires: new Date(Date.now() + 60 * 60 * 24 * 1000), httpOnly: true, maxAge: 60 * 60 * 24 });
}