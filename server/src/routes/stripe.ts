import express, { Request, Response } from 'express';
import Stripe from 'stripe';


const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Verificar si la clave secreta de Stripe está definida
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Inicializar la instancia de Stripe con la clave secreta y la versión de la API
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
});

// Definir una ruta POST para crear un PaymentIntent
router.post('/payment', async (req: Request, res: Response) => {
    try {
        // Crear un cargo utilizando el token de pago y el monto proporcionado
        const charge = await stripe.charges.create({
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: 'usd',
        });
    
        // Enviar la respuesta del cargo como respuesta
        res.status(200).json(charge);
      } catch (error) {
        // Manejar cualquier error que ocurra durante la creación del cargo
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    });


export default router;