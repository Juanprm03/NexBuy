import { Schema, model, Document, models } from 'mongoose';

// Define la interfaz TypeScript para el usuario
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
}

// Define el esquema de Mongoose para el usuario
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
},
{ timestamps: true });

// Verifica si el modelo ya está definido antes de definirlo nuevamente
const User = models.User || model<IUser>('User', UserSchema);

export default User;