import { prisma } from '../prismaClient.js';
import { verifyToken } from '../utils/jwt.js';
export async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const payload = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, email: true, role: true }
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
export function adminOnly(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
}
//# sourceMappingURL=authMiddleware.js.map