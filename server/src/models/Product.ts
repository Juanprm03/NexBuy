import { Schema, model, Document, models } from 'mongoose';

// Define la interfaz TypeScript para el producto
interface IProduct extends Document {
    title: string;
    description: string;
    imageUrl: string;
    categories: string[];
    size: string;
    color: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

// Define el esquema de Mongoose para el producto
const ProductSchema = new Schema<IProduct>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    categories: { type: [String] },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true }
},
{ timestamps: true });

// Verifica si el modelo ya está definido antes de definirlo nuevamente
const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;