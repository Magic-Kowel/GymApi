import { pool } from "../../db.js";
import logger from "../../libs/logger.js";

export const validatePhoneUpdate = async (req, res) => {
    try {
        const phone = req.params.phone;
        const userId = req.params.id;
        if (!phone || !userId) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios (phone o id)"
            });
        }

        const [validateEmail] = await pool.query(
            `SELECT email FROM users WHERE phone = ? AND id_user != ?`,
            [phone, userId]
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