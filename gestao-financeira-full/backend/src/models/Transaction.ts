import mongoose, { Schema, Document } from 'mongoose';

// 1. Interface: Ajuda o TypeScript a saber os tipos de dados
export interface ITransaction extends Document {
  user: mongoose.Schema.Types.ObjectId; // Link com o Usuário
  text: string;                         // Descrição (ex: "Aluguel")
  amount: number;                       // Valor (ex: -500 ou 1000)
  createdAt: Date;                      // Data de criação
}

// 2. Schema: As regras para o Banco de Dados (MongoDB)
const TransactionSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Tipo especial ID do Mongo
    ref: 'User',                          // Aponta para o Model 'User'
    required: true
  },
  text: {
    type: String,
    required: [true, 'Por favor, adicione uma descrição']
  },
  amount: {
    type: Number,
    required: [true, 'Por favor, adicione um valor positivo ou negativo']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 3. Exportar: Cria o modelo oficial
export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
