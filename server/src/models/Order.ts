import { Schema, model, Document } from 'mongoose';

// Define la interfaz para el producto en el carrito
interface IProduct {
    productId: string;
    quantity: number;
}

// Define la interfaz para la orden
interface IOrder extends Document {
    userId: string;
    products: IProduct[];
    amount: number;
    address: Object;
    status: string;
}


// Define el esquema de Mongoose para el producto en el carrito
const ProductSchema = new Schema<IProduct>({
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1}
    
   
}
);

// Define el esquema de Mongoose para la orden
const OrderSchema = new Schema<IOrder>({
    userId: { type: String, required: true},
    products: { type: [ProductSchema], required:true},
    amount: { type: Number, required: true},
    address: { type: Object, required: true},
    status: { type: String, default: 'Pending'},
    
}, {timestamps:true},)

// Crea el modelo de Mongoose basado en el esquema
const Order = model<IOrder>('Order', OrderSchema);

export default Order;