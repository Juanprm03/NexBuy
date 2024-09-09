import express from 'express'; // Import the Express.js library
import User from '../models/User'; // Import the User model from the models directory
import CryptoJS from 'crypto-js'; // Import the CryptoJS library for encryption

const router = express.Router(); // Initialize a new router instance using Express.js

// Register 
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Destructure the request body to get username, email, and password

    // Check if all fields are filled
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' }); // Respond with status 400 if any field is missing
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' }); // Respond with status 400 if the email is already registered
        }

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY || 'default-secret-key').toString();

        // Create a new instance of the User model with the data from the request body
        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser); // Respond with status 201 and the saved user data if successful
    } catch (err) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message }); // Respond with status 500 and the error message if there is an error
        } else {
            return res.status(500).json({ error: 'An unknown error occurred' }); // Respond with status 500 and a generic error message if the error is unknown
        }
    }
});

// Login 
router.post('/login', async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findOne({
            username: req.body.username
        });

        // If user is not found, respond with status 401
        if (!user) {
            return res.status(401).json('Wrong Credentials!');
        }

        // Decrypt the stored password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY || 'default-secret-key');
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // If the decrypted password does not match the provided password, respond with status 401
        if (originalPassword !== req.body.password) {
            return res.status(401).json('Wrong Credentials!');
        }


        // Convert the user document to a plain object
        const userObject = user.toObject();
        // Exclude the password from the user object before sending the response
        const { password, ...others } = userObject;

        // Respond with status 200 and the user data excluding the password
        res.status(200).json(others);
    } catch (err) {
        // Check if the error is an instance of Error
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message }); // Respond with status 500 and the error message if there is an error
        } else {
            return res.status(500).json({ error: 'An unknown error occurred' }); // Respond with status 500 and a generic error message if the error is unknown
        }
    }
});

export default router; 