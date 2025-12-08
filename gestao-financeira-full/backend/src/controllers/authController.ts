
import { Request, Response } from "express";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { authConfig } from "../config/auth";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Busca o usuário no banco
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userQuery.rowCount === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = userQuery.rows[0];

    // Verifica senha
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    // JWT 9+ exige Secret com tipo explícito
    const secret: Secret = authConfig.jwtSecret as string;

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id },
      secret,
      {
        expiresIn: authConfig.jwtExpiresIn,
      }
    );

    return res.json({ token });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
