import bcrypt from 'bcryptjs';
import { prisma } from '../prismaClient.js';
import { signToken } from '../utils/jwt.js';
export async function registerUser(email, password, name) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    const existing = await prisma.user.findUnique({
        where: { email }
    });
    if (existing) {
        throw new Error('Email already in use');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            name: name ?? '' // ✅ FIX: never undefined
        }
    });
    return {
        token: signToken({ id: user.id, role: user.role }),
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    };
}
export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid credentials');
    }
    return {
        token: signToken({ id: user.id, role: user.role }),
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    };
}
//# sourceMappingURL=authService.js.map