import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Tenta conectar usando a variável de ambiente ou uma string vazia para evitar erro de TS
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
        console.error(`Erro: ${error.message}`);
    } else {
        console.error('Erro desconhecido na conexão com o banco');
    }
    process.exit(1);
  }
};

export default connectDB;
