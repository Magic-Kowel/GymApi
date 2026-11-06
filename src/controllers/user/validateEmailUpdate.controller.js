import { pool } from "../../db.js";
import logger from "../../libs/logger.js";

export const validateEmailUpdate = async (req, res) => {
    try {
        const email = req.params.email; // O req.query.email dependiendo de cómo lo mandes
        const userId = req.params.id;   // 👈 Necesitas recibir el ID del usuario actual
        if (!email || !userId) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios (email o id)"
            });
        }

        // 🟢 Consultamos si el correo ya existe, EXCLUYENDO al usuario actual por su ID
        const [validateEmail] = await pool.query(
            `SELECT email FROM users WHERE email = ? AND id_user != ?`,
            [email, userId]
        );

        if (validateEmail.length) {
            return res.status(409).json({
                valid: false,
                message: "El correo electrónico ya se encuentra registrado por otro usuario"
            });
        } else {
            return res.status(200).json({
                valid: true,
                message: "El correo electrónico es válido"
            });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error.message || error
        });
    }
};