import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

const verifyToken = (req, res, next) => {
    // 1. Obtenemos la cookie (gracias a cookie-parser)
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
        // 2. Verificamos el token (si expiró o si la firma no coincide, lanzará un error)
        const decoded = jwt.verify(token, SECRET_KEY);

        // 3. Guardamos los datos del usuario en el request para usarlos en la ruta
        req.user = decoded;

        next(); // Continuar con la petición
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

export default verifyToken;