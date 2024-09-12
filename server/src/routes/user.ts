import express, { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import authMiddleware from './verifyToken'; 

// Desestructuración de las funciones
const { verifyToken, verifyTokenAndAuthorization } = authMiddleware; 

const router = express.Router();

// GET /user
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the NexBuy Server')
});

// post user
router.post('/test', (req: Request, res: Response) => {
    const username = req.body.username;
    res.send(`Welcome ${username}`)
});

// update user
router.put('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    if(req.body.password){
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        
        }, {new: true});
        res.status(200).json(updateUser);
    }catch(err){
        return res.status(500).json(err);
    }
});

// DELETE /user/:id
router.delete('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});



export default router;