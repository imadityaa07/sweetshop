import jwt from 'jsonwebtoken';
/**
 * Ensure JWT_SECRET exists at startup
 */
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
export function signToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, SECRET, { expiresIn });
}
export function verifyToken(token) {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded !== 'object' ||
        !decoded.id ||
        !decoded.role) {
        throw new Error('Invalid token payload');
    }
    return {
        id: decoded.id,
        role: decoded.role
    };
}
//# sourceMappingURL=jwt.js.map