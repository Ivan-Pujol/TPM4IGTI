import express from 'express';
import { clientRouter } from './routes/apiRoutes.js';
import { connectDB } from './src/serverConection.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());
app.use(clientRouter);
connectDB();
app.listen(process.env.PORT, () => console.log("API iniciada."));

console.log(process.env.WELCOME_MSG);
