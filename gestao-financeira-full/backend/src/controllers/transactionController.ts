import express from 'express';
// Importando os nomes CORRETOS que criamos no controller novo
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactionController';
// Importando a proteção de login (se você tiver esse middleware)
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Rota: /api/transactions
// GET -> Pega todas | POST -> Cria nova
router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

// Rota: /api/transactions/:id
// DELETE -> Remove uma transação específica
router.route('/:id')
  .delete(protect, deleteTransaction);

export default router;
