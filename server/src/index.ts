import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import authRouter from './routes/auth';

dotenv.config();
const app: Application = express();


// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


// Puerto y URL of database
const port: string | number = process.env.PORT || 5000;
const db: string = process.env.ATLAS_URI || '';

if (!db) {
    throw new Error('ATLAS_URI must be defined in the environment variables');
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
// MongoDB connection
mongoose.connect(db)
.then(() =>{
    console.log('MongoDB connected')
}).catch((err: Error) => console.log(err));