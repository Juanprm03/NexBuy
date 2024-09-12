import express from 'express'; 
import User from '../models/User'; 
import bcrypt from 'bcrypt';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Desestructura el cuerpo de la solicitud para obtener el nombre de usuario, correo electrónico y contraseña

    // Verifica si todos los campos están llenos
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' }); 
    }

    try {
        // Verifica si el correo electrónico ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya existe' }); 
        }

        // Encripta la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crea un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Guarda el usuario en la base de datos
        const savedUser = await newUser.save();

        // Responde con el nuevo usuario
        return res.status(201).json(savedUser); 
    } catch (err) {
        // Verifica si el error es una instancia de Error
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message }); 
        } else {
            return res.status(500).json({ error: 'Ocurrió un error desconocido' }); 
        }
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        // Encuentra al usuario por nombre de usuario
        const user = await User.findOne({
            username: req.body.username
        });

        // Si el usuario no es encontrado, responde con estado 401
        if (!user) {
            return res.status(401).json('¡Credenciales incorrectas!');
        }

        // Desencripta la contraseña almacenada
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // Compara la contraseña desencriptada con la contraseña proporcionada
        if (!isMatch) {
            return res.status(401).json('¡Credenciales incorrectas!');
        }

        // Responde con el usuario si las credenciales son correctas
        return res.status(200).json(user);
    } catch (err) {
        // Verifica si el error es una instancia de Error
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message }); 
        } else {
            return res.status(500).json({ error: 'Ocurrió un error desconocido' });
        }
    }
});

export default router;