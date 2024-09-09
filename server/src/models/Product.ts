import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interface for the product
interface IProduct extends Document {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    categories: string[];
    size: string;
    color: string;
    price: number;
}

// Define the Mongoose schema for the product
const ProductSchema = new Schema<IProduct>({
    id: { type: Number, required: true },
    title: { type: String, required: true, unique:true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    categories: { type: [String] },
    size: { type: String },
    color: { type: String},
    price: { type: Number, required: true}
},
    {timestamps: true}
);

// Create the Mongoose model based on the schema
const Product = model<IProduct>('User', ProductSchema);

export default Product;