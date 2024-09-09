import express, { Request, Response } from 'express';

const router = express.Router();

// GET /user
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the NexBuy Server')
});

// POST /user
router.post('/test', (req: Request, res: Response) => {
    const username = req.body.username;
    res.send(`Welcome ${username}`)
});

// PUT /user/:id
router.put('/:id', (req: Request, res: Response) => {
    // Your code here
});

// DELETE /user/:id
router.delete('/:id', (req: Request, res: Response) => {
    // Your code here
});

export default router;