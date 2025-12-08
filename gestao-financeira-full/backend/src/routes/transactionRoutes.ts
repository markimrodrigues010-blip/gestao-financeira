
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createTransaction, listTransactions } from "../controllers/transactionController";

const router = Router();
router.use(authMiddleware);
router.post("/", createTransaction);
router.get("/", listTransactions);

export default router;
