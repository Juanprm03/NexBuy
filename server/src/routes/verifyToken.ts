import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el encabexzado de autorización 
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        // Si no se proporciona el encabezado de autorización, devuelve un error
        console.error('Authorization header missing');
        return res.status(401).json(' Access denied');
    }


    // Dividir el encabezado y obtener el token
    const token = authHeader.split(' ')[1]; 

    try {
         // Verificar que la clave secreta JWT esté definida
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json('Internal server error');
        }

        // Verificar el token usando la clave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = verified; // Usar aserción de tipo para indicar que req.user existe
        next(); // Continuar con el siguiente middleware
    } catch (err) {
          // Si la verificación del token falla, devolver un error 40
        return res.status(400).json('Token no válido');
    }
};

// Middleware para verificar el token y la autorización del usuario
const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        // Verificar si el usuario tiene permiso para realizar la acción
        const user = (req as any).user; // Usar aserción de tipo para indicar que req.user existe
        if (user.id === req.params.id || user.isAdmin) {
            next();
        } else {
            // si el usuario no tiene permiso, devuelve un error
            res.status(403).json('You aren\'t allowed to do that');
        }
    });
};

export default { verifyToken, verifyTokenAndAuthorization };