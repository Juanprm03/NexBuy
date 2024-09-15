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
router.post('/', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    // Desestructura los campos del cuerpo de la solicitud
    const { title, description, categories, size, color, price } = req.body;
    const filePath = req.file?.path; // Obtiene la ruta del archivo subido
    
    // Verifica si no se ha subido ningún archivo
    if (!filePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Verificar que los campos requeridos están presentes
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Title, description, and price are required.' });
    }

    // Convertir la cadena de categorías en un array
    const categoriesArray = categories.split(',').map((cat: string) => cat.trim());

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'nexbuy',
    });

    // Eliminar el archivo local después de subirlo a Cloudinary
    fs.unlinkSync(filePath);
    
    // Crea un nuevo carrito con los datos proporcionados
    const newCart = new Cart({
      title,
      description,
      categories: categoriesArray,
      size,
      color,
      price,
      imageUrl: result.secure_url,
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