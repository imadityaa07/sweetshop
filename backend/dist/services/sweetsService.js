import { prisma } from '../prismaClient.js';
/**
 * CREATE SWEET
 * Supports optional imageUrl
 */
export async function createSweet(data, userId) {
    return prisma.sweet.create({
        data: {
            name: data.name,
            category: data.category,
            price: Number(data.price),
            quantity: Number(data.quantity),
            imageUrl: data.imageUrl || null, // ✅ added
            createdBy: userId
        }
    });
}
/**
 * LIST ALL SWEETS
 */
export async function listSweets() {
    return prisma.sweet.findMany({
        orderBy: { createdAt: 'desc' }
    });
}
/**
 * SEARCH SWEETS
 */
export async function searchSweets(filters) {
    const where = {};
    if (filters.q) {
        where.name = { contains: String(filters.q), mode: 'insensitive' };
    }
    if (filters.category) {
        where.category = String(filters.category);
    }
    if (filters.minPrice || filters.maxPrice) {
        where.price = {};
        if (filters.minPrice)
            where.price.gte = Number(filters.minPrice);
        if (filters.maxPrice)
            where.price.lte = Number(filters.maxPrice);
    }
    return prisma.sweet.findMany({ where });
}
/**
 * UPDATE SWEET (Admin)
 * Only price, quantity, imageUrl are editable
 */
export async function updateSweet(id, data) {
    return prisma.sweet.update({
        where: { id },
        data: {
            ...(data.price !== undefined && { price: Number(data.price) }),
            ...(data.quantity !== undefined && { quantity: Number(data.quantity) }),
            ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl })
        }
    });
}
/**
 * DELETE SWEET
 */
export async function deleteSweet(id) {
    return prisma.sweet.delete({ where: { id } });
}
/**
 * PURCHASE SWEET (Transactional)
 */
export async function purchaseSweet(id, qty) {
    return prisma.$transaction(async (tx) => {
        const sweet = await tx.sweet.findUnique({ where: { id } });
        if (!sweet || sweet.quantity < qty) {
            throw new Error('Insufficient stock');
        }
        return tx.sweet.update({
            where: { id },
            data: {
                quantity: { decrement: qty }
            }
        });
    });
}
/**
 * RESTOCK SWEET
 */
export async function restockSweet(id, qty) {
    return prisma.sweet.update({
        where: { id },
        data: {
            quantity: { increment: qty }
        }
    });
}
//# sourceMappingURL=sweetsService.js.map