import { Schema, model, Document } from 'mongoose';

// Define the TypeScript interface for the user
interface IUser extends Document {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
}

// Define the Mongoose schema for the user
const UserSchema = new Schema<IUser>({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false}
},
    {timestamps: true}
);

//Create the Mongoose model based on the schema
const User = model<IUser>('User', UserSchema);

export default User;