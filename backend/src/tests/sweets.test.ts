import { Router } from 'express';
import {
  createSweet,
  deleteSweet,
  listSweets,
  purchaseSweet,
  restockSweet,
  searchSweets,
  updateSweet
} from '../controllers/sweetsController.js';
import { adminOnly, authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', adminOnly, createSweet);
router.get('/', listSweets);
router.get('/search', searchSweets);
router.put('/:id', adminOnly, updateSweet);
router.delete('/:id', adminOnly, deleteSweet);
router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock', adminOnly, restockSweet);

export default router;
  