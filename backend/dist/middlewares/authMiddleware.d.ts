import type { NextFunction, Request, Response } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: 'USER' | 'ADMIN';
    };
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function adminOnly(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.d.ts.map