import { Router } from "express";
import { login, register } from "../controllers/authController"; // 💡 O 'register' foi adicionado aqui
const router = Router();

router.post("/login", login);
router.post("/register", register); // 💡 A nova rota para criar conta foi adicionada aqui

export default router;
