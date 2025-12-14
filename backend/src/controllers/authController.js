import { loginUser, registerUser } from '../services/authService.js';
export async function register(req, res, next) {
    try {
        const { email, password, name } = req.body;
        const result = await registerUser(email, password, name);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=authController.js.map