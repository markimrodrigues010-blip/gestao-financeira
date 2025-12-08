import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Certifique-se de ter instalado: npm install bcryptjs @types/bcryptjs
import User from '../models/User'; // Ajuste este caminho para onde está seu Model de Usuário

// Função auxiliar para gerar o Token (Resolve o erro do TypeScript centralizando a lógica)
const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;

  // Verificação de segurança: O TypeScript reclama se o segredo puder ser undefined
  if (!secret) {
    throw new Error('ERRO CRÍTICO: A variável JWT_SECRET não está definida no ambiente.');
  }

  // A ordem correta dos argumentos é: (payload, secret, options)
  return jwt.sign({ id }, secret, {
    expiresIn: '7d', // Token expira em 7 dias
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar se o usuário existe
    const user = await User.findOne({ email }); // Ajuste conforme sua ORM (ex: findUnique no Prisma)

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // 2. Verificar se a senha bate (assumindo que está criptografada no banco)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // 3. Gerar o Token (Aqui estava o erro no seu código original)
    const token = generateToken(user._id.toString()); // Ajuste user._id conforme seu banco de dados

    // 4. Retornar dados do usuário (sem a senha) e o token
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {
    console.error('Erro no Login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Bônus: Função de Registro (caso precise)
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    // Criptografar senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      return res.status(400).json({ message: 'Dados de usuário inválidos' });
    }

  } catch (error) {
    console.error('Erro no Registro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
