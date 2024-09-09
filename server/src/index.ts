import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'


const app: Application = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/v1', (req, res) =>{
    res.send('Welcome to NexBuy server')
})

// Puerto y URL of database
const port: string | number = process.env.PORT || 5000;
const db: string = process.env.ATLAS_URI || '';

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
// MongoDB connection
mongoose.connect(db)
.then(() =>{
    console.log('MongoDB connected')
}).catch((err: Error) => console.log(err));