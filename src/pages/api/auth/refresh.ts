// import type { APIRoute } from 'astro';
// import jwt, { type JwtPayload } from 'jsonwebtoken';
// import { AuthRefreshTokenStorage } from '@/utilities/helpers/redisStorage';

// export const POST: APIRoute = async ({ request, session, cookies }) => {
//     try {
//         const { refreshToken } = await request.json();

//         if (!refreshToken) {
//             return new Response(JSON.stringify({
//                 message: "Refresh token is required"
//             }), { status: 400 });
//         }

//         const jwtSecret = import.meta.env.JWT_SECRET || import.meta.env.JWT_SECRET_OLD;
//         const decodedRefreshToken = jwt.verify(refreshToken, jwtSecret) as JwtPayload;
//         // Check if the refresh token is valid
//         const storedRefreshToken = await AuthRefreshTokenStorage.getItem(`${decodedRefreshToken.id}`);
//         if (storedRefreshToken !== refreshToken) {
//             return new Response(JSON.stringify({
//                 message: "Invalid refresh token"
//             }), { status: 401 });
//         }

//         // Generate new access token
//         const tokenPayload = { 
//             email: decodedRefreshToken.email, 
//             role: decodedRefreshToken.role, 
//             id: decodedRefreshToken.id 
//         };

//         // Generate tokens in parallel
//         const [token, refreshedToken] = await Promise.all([
//             jwt.sign(tokenPayload, jwtSecret, { 
//                 expiresIn: parseInt(import.meta.env.JWT_EXPIRES_IN)
//             }),
//             jwt.sign(tokenPayload, jwtSecret, { 
//                 expiresIn: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN)
//             })
//         ]);
//         // Store tokens in Redis in parallel
//         await Promise.all([
//             // Store tokens in session instead (making each session identifiable using the user id)
//             session.set(`user_${tokenPayload.id}`, token),
//             // console.log(session.sessionID),
//             // cookies.set(import.meta.env.SESSION_NAME, session.sessionID, { httpOnly: true, maxAge: parseInt(import.meta.env.JWT_EXPIRES_IN) }),
//             // store refreshToken in memory
//             AuthRefreshTokenStorage.setItem(`${tokenPayload.id}`, refreshedToken, {
//                 ttl: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN)
//             })
//         ]);

//         return new Response(JSON.stringify({
//             token: token,
//             message: "Token refreshed successfully"
//         }), { status: 200 });

//     } catch (error) {
//         console.error('Refresh token error:', error);
//         return new Response(JSON.stringify({
//             message: "Internal server error"
//         }), { status: 500 });
//     }
// };
