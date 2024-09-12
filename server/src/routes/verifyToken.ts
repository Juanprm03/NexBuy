import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.error('Authorization header missing');
        return res.status(401).json(' Access denied');
    }


    // Dividir el encabezado y obtener el token
    const token = authHeader.split(' ')[1]; 

    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json('Internal server error');
        }


        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = verified; // Usar aserción de tipo para indicar que req.user existe
        next();
    } catch (err) {
        return res.status(400).json('Token no válido');
    }
};

const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        const user = (req as any).user; // Usar aserción de tipo para indicar que req.user existe
        if (user.id === req.params.id || user.isAdmin) {
            next();
        } else {
            res.status(403).json('You aren\'t allowed to do that');
        }
    });
};

export default { verifyToken, verifyTokenAndAuthorization };