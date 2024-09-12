import express, { Request, Response } from 'express';
import upload from '../multerConfig';
import Product from '../models/Product';

const router = express.Router();

// POST /upload image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const { title, description, categories, size, color, price } = req.body;
      const imageUrl = (req.file as Express.Multer.File)?.path;
  
      const newProduct = new Product({
        title,
        description,
        categories,
        size,
        color,
        price,
        imageUrl,
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error });
    }
  });