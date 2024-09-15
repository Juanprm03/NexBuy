import express, { Request, Response } from 'express';
import upload from '../multerConfig';
import Product from '../models/Product';
import authMiddleware from './verifyToken';
import cloudinary from '../cloudinaryConfig';
import fs from 'fs';

const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = authMiddleware;

// POST /upload image
router.post('/', verifyTokenAndAdmin, upload.single('image'), async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Log para verificar el cuerpo de la solicitud
    console.log('File:', req.file); // Log para verificar el archivo subido

    const { title, description, categories, size, color, price } = req.body;
    const filePath = req.file?.path;

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

    const newProduct = new Product({
      title,
      description,
      categories: categoriesArray,
      size,
      color,
      price,
      imageUrl: result.secure_url,
    });

    await newProduct.save();
    console.log('Product saved:', newProduct); // Log para verificar que el producto se guarda
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error:', error); // Log para verificar cualquier error
    res.status(500).json({ message: 'Error uploading image', error });
  }
});





// GET product
router.get('/find/:id', async (req: Request, res: Response) => {
    try{
        // Buscar el usuario por el id en la base de datos
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(err){
        return res.status(500).json(err);
    }
});

// Get All Products
router.get('/', async (req: Request, res: Response) => {
  const qNew = req.query.new;
  const qCategory = req.query.category as string;
  console.log('Category:', qCategory);
  try {
    let products;

    if (qNew) {
      // Obtener los productos más recientes de la base de datos
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      // Obtener los productos por categoría de la base de datos
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
      console.log('Products found:', products);
    } else {
      // Obtener todos los productos de la base de datos
      products = await Product.find();
    }

    // Manejar el caso en el que no se encuentran productos
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given category' });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error('Error:', err); // Log para verificar cualquier error
    return res.status(500).json({ message: 'Error fetching products', error: err });
  }
});




// update Product
router.put('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try{
        // Actualizar el usuario en la base de datos
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        
        }, {new: true});
        res.status(200).json(updateProduct);
    }catch(err){
        return res.status(500).json(err);
    }
});

// // DELETE /user/:id
router.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        // Eliminar el usuario de la base de datos
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});



export default router;