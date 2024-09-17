import express, { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import authMiddleware from './verifyToken'; 

// Desestructuración de las funciones
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = authMiddleware; 

const router = express.Router();


// GET user
router.get('/find/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try{
        // Buscar el usuario por el id en la base de datos
        const user = await User.findById(req.params.id);
        res.status(200).json({user});
    } catch(err){
        return res.status(500).json(err);
    }
});

// Get All users
router.get('/', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    // Obtener el parámetro de consulta new
    const query = req.query.new;
    try{
        // Obtener todos los usuarios de la base de datos y ordenarlos por id de forma descendente
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch(err){
        return res.status(500).json(err);
    }
});

// Get User Stats
router.get('/stats', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    // Obtener la fecha actual
    const date = new Date();
    // Calcular la fecha del mismo día del año pasado
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        // Obtener las estadísticas de los usuarios de la base de datos
        const data = await User.aggregate([
            {    
                // Filtrar los usuarios creados en el último año
                $match: {
                    createdAt: { $gte: lastYear}
                 }
            },
            {
                // Proyectar el mes de creación de cada usuario
                $project: {
                    month: { $month: "$createdAt"}
                }
            },
            {
                // Agrupar por mes y contar el total de usuarios creados en cada mes
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json(data);
    } catch(err){
        return res.status(500).json(err);
    }
})

// post user
router.post('/test', (req: Request, res: Response) => {
    const username = req.body.username;
    res.send(`Welcome ${username}`)
});

// update user
router.put('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
     // Si se proporciona una nueva contraseña, encriptarla
    if(req.body.password){
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    try{
        // Actualizar el usuario en la base de datos
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        
        }, {new: true});
        res.status(200).json(updateUser);
    }catch(err){
        return res.status(500).json(err);
    }
});

// DELETE /user/:id
router.delete('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
        // Eliminar el usuario de la base de datos
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});



export default router;