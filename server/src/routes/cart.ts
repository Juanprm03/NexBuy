import express, { Request, Response } from 'express';
import upload from '../multerConfig';
import Product from '../models/Product';
import authMiddleware from './verifyToken';
import cloudinary from '../cloudinaryConfig';
import fs from 'fs';
import Cart from '../models/Cart';

const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = authMiddleware; // Desestructura los métodos de autenticación

// POST /upload image
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    // Desestructura los campos del cuerpo de la solicitud
    const { userId, products } = req.body;
    
     // Verificar que los campos requeridos están presentes
     if (!userId || !products) {
      return res.status(400).json({ message: 'User ID and products are required.' });
    }
    
    // Crea un nuevo carrito con los datos proporcionados
    const newCart = new Cart({
      userId,
      products,
    });

    await newCart.save();
    
    res.status(201).json({ message: 'Product created successfully', product: newCart });
  } catch (error) {
    
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

// GET  User Cart
router.get('/find/:userId', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try{
        // Buscar el carrito por el id del usuario en la base de datos
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch(err){
        return res.status(500).json(err);
    }
});

// Get All 
// Ruta para obtener todos los carritos (solo accesible por administradores)
router.get('/', verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    // Obtener todos los carritos de la base de datos
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
   
    return res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// update Cart
router.put('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try{
        // Actualizar el carrito con los datos proporcionados
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        
        }, {new: true});
        res.status(200).json(updateCart);
    }catch(err){
        return res.status(500).json(err);
    }
});

// // DELETE /user/:id
router.delete('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
        // Eliminar el carrito de la base de datos
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});



export default router;