import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.js';
import sweetsRoutes from './routes/sweets.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map