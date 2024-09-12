import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interface for the product in the cart
interface IProduct {
    productId: string;
    quantity: number;
}

// Define the TypeScript interface for the cart
interface ICart extends Document {
    userid: number;
    products: IProduct[];
}

// Define the Mongoose schema for the product in the cart
const ProductSchema = new Schema<IProduct>({
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1}
    
   
},
    {timestamps: true}
);

const CartSchema = new Schema<ICart>({
    userid: { type: Number, required: true},
    products: { type: [ProductSchema], required:true}
})

// Create the Mongoose model based on the schema
const Cart = model<ICart>('Cart', CartSchema);

export default Cart;