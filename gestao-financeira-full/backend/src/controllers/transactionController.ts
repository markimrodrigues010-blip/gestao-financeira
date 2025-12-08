import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

// @desc    Pegar todas as transações
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({ user: (req as any).user.id });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};

// @desc    Adicionar transação
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create({
      text,
      amount,
      user: (req as any).user.id
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    if ((error as any).name === 'ValidationError') {
      const messages = Object.values((error as any).errors).map((val: any) => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar transação'
      });
    }
  }
};

// @desc    Deletar transação
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transação não encontrada'
      });
    }

    if (transaction.user.toString() !== (req as any).user.id) {
        return res.status(401).json({
            success: false,
            error: 'Não autorizado'
        });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar'
    });
  }
};
