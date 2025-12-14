import type { SignOptions } from 'jsonwebtoken';
export interface JwtUserPayload {
    id: number;
    role: 'USER' | 'ADMIN';
}
export declare function signToken(payload: JwtUserPayload, expiresIn?: SignOptions['expiresIn']): string;
export declare function verifyToken(token: string): JwtUserPayload;
//# sourceMappingURL=jwt.d.ts.map