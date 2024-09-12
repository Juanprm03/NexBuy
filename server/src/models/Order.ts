import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interface for the product in the cart
interface IProduct {
    productId: string;
    quantity: number;
}

// Define the TypeScript interface for the cart
interface IOrder extends Document {
    userId: number;
    products: IProduct[];
    amount: number;
    address: Object;
    status: string;
}

// Define the Mongoose schema for the product in the cart
const ProductSchema = new Schema<IProduct>({
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1}
    
   
},
    {timestamps: true}
);

const OrderSchema = new Schema<IOrder>({
    userId: { type: Number, required: true},
    products: { type: [ProductSchema], required:true},
    amount: { type: Number, required: true},
    address: { type: Object, required: true},
    status: { type: String, default: 'Pending'}
})

// Create the Mongoose model based on the schema
const Order = model<IOrder>('Order', OrderSchema);

export default Order;