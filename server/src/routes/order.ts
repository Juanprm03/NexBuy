import express, { Request, Response } from 'express';
import authMiddleware from './verifyToken';
import fs from 'fs';
import Order from '../models/Order';

const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = authMiddleware; // Desestructura los métodos de autenticación

// POST /upload image
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    // Desestructura los campos del cuerpo de la solicitud
    const {  userId, products, amount, address, status} = req.body;
    

    // Verificar que los campos requeridos están presentes
    if (!userId || !products || !amount || !address) {
        return res.status(400).json({ message: 'User ID, products, amount, and address are required.' });
      }


    // Crea un nuevo carrito con los datos proporcionados
    const newOrder = new Order({
        userId,
        products,
        amount,
        address,
        status,
    });

    await newOrder.save();
    
    res.status(201).json({ message: 'Order created successfully', product: newOrder });
  } catch (error) {
    
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// GET  User Orders
router.get('/find/:userId', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try{
        // Buscar el carrito por el id del usuario en la base de datos
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch(err){
        return res.status(500).json(err);
    }
});

// Get All 
// Ruta para obtener todos los carritos (solo accesible por administradores)
router.get('/', verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    // Obtener todos los carritos de la base de datos
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
   
    return res.status(500).json({ message: 'Error fetching Order', error: err });
  }
});

// update Cart
router.put('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try{
        // Actualizar el carrito con los datos proporcionados
        const updateCart = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        
        }, {new: true});
        res.status(200).json(updateCart);
    }catch(err){
        return res.status(500).json(err);
    }
});

// // DELETE /user/:id
router.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        // Eliminar el carrito de la base de datos
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Monthly Income
router.get('/income', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth}}},
            { $project: { month: { $month: '$createdAt'}, sales: '$amount'}},
            { $group: { _id: '$month', total: { $sum: '$sales'}}}
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err);
    }
})


export default router;