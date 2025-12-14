/**
 * CREATE SWEET
 * Supports optional imageUrl
 */
export declare function createSweet(data: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}, userId: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}>;
/**
 * LIST ALL SWEETS
 */
export declare function listSweets(): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}[]>;
/**
 * SEARCH SWEETS
 */
export declare function searchSweets(filters: any): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}[]>;
/**
 * UPDATE SWEET (Admin)
 * Only price, quantity, imageUrl are editable
 */
export declare function updateSweet(id: number, data: {
    price?: number;
    quantity?: number;
    imageUrl?: string;
}): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}>;
/**
 * DELETE SWEET
 */
export declare function deleteSweet(id: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}>;
/**
 * PURCHASE SWEET (Transactional)
 */
export declare function purchaseSweet(id: number, qty: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}>;
/**
 * RESTOCK SWEET
 */
export declare function restockSweet(id: number, qty: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdBy: number;
}>;
//# sourceMappingURL=sweetsService.d.ts.map