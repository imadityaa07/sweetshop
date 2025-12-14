import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
/**
 * CREATE SWEET (Admin)
 * Accepts: name, category, price, quantity, imageUrl
 */
export declare function createSweet(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * LIST ALL SWEETS
 */
export declare function listSweets(req: Request, res: Response, next: NextFunction): Promise<void>;
/**
 * SEARCH SWEETS
 */
export declare function searchSweets(req: Request, res: Response, next: NextFunction): Promise<void>;
/**
 * UPDATE SWEET (Admin)
 * Only allows updating price, quantity, imageUrl
 */
export declare function updateSweet(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * DELETE SWEET (Admin)
 */
export declare function deleteSweet(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * PURCHASE SWEET (User)
 */
export declare function purchaseSweet(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * RESTOCK SWEET (Admin)
 */
export declare function restockSweet(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=sweetsController.d.ts.map