
import { Response } from "express";
import { pool } from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";

export async function createTransaction(req: AuthRequest, res: Response) {
  const { type, title, amount, transaction_date } = req.body;

  const result = await pool.query(
    `INSERT INTO transactions (type, title, amount, transaction_date, created_by)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [type, title, amount, transaction_date, req.userId]
  );

  res.json(result.rows[0]);
}

export async function listTransactions(req: AuthRequest, res: Response) {
  const result = await pool.query("SELECT * FROM transactions ORDER BY id DESC");
  res.json(result.rows);
}
