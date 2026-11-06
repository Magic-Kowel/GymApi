import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const validateEmail = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [validateEmail] = await pool.query(`SELECT email FROM users WHERE email = ? `, [email]);
        if (validateEmail.length) {
            return res.status(409).json({
                valid: false,
                message: "El correo electrónico ya se encuentra registrado"
            });
        } else {
            return res.status(200).json({
                valid: true,
                message: "El correo electrónico es valido "
            })
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}