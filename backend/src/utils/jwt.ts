import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

/**
 * Ensure JWT_SECRET exists at startup
 */
const SECRET = process.env.JWT_SECRET as string;

if (!SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface JwtUserPayload {
  id: number;
  role: 'USER' | 'ADMIN';
}

export function signToken(
  payload: JwtUserPayload,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtUserPayload {
  const decoded = jwt.verify(token, SECRET) as JwtPayload;

  if (
    typeof decoded !== 'object' ||
    !decoded.id ||
    !decoded.role
  ) {
    throw new Error('Invalid token payload');
  }

  return {
    id: decoded.id as number,
    role: decoded.role as 'USER' | 'ADMIN'
  };
}
