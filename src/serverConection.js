import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URI = `mongodb+srv://${process.env.USER_PWD}@cluster0-v1f1n.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log("Erro ao conectar ao mongodb.");
  }
};

export { connectDB };