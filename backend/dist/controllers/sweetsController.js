import * as SweetService from '../services/sweetsService.js';
/**
 * CREATE SWEET (Admin)
 * Accepts: name, category, price, quantity, imageUrl
 */
export async function createSweet(req, res, next) {
    try {
        const { name, category, price, quantity, imageUrl } = req.body;
        const sweet = await SweetService.createSweet({
            name,
            category,
            price,
            quantity,
            imageUrl // ✅ allow image URL
        }, req.user.id);
        res.status(201).json(sweet);
    }
    catch (err) {
        next(err);
    }
}
/**
 * LIST ALL SWEETS
 */
export async function listSweets(req, res, next) {
    try {
        res.json(await SweetService.listSweets());
    }
    catch (err) {
        next(err);
    }
}
/**
 * SEARCH SWEETS
 */
export async function searchSweets(req, res, next) {
    try {
        res.json(await SweetService.searchSweets(req.query));
    }
    catch (err) {
        next(err);
    }
}
/**
 * UPDATE SWEET (Admin)
 * Only allows updating price, quantity, imageUrl
 */
export async function updateSweet(req, res, next) {
    try {
        const { price, quantity, imageUrl } = req.body;
        res.json(await SweetService.updateSweet(Number(req.params.id), {
            price,
            quantity,
            imageUrl // ✅ allow updating image
        }));
    }
    catch (err) {
        next(err);
    }
}
/**
 * DELETE SWEET (Admin)
 */
export async function deleteSweet(req, res, next) {
    try {
        await SweetService.deleteSweet(Number(req.params.id));
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
/**
 * PURCHASE SWEET (User)
 */
export async function purchaseSweet(req, res, next) {
    try {
        res.json(await SweetService.purchaseSweet(Number(req.params.id), Number(req.body.quantity || 1)));
    }
    catch (err) {
        next(err);
    }
}
/**
 * RESTOCK SWEET (Admin)
 */
export async function restockSweet(req, res, next) {
    try {
        res.json(await SweetService.restockSweet(Number(req.params.id), Number(req.body.quantity || 1)));
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=sweetsController.js.map