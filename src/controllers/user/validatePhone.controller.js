import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const validatePhone = async (req, res) => {
    try {
        const phone = req.params.phone;
        if (!phone) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [validatePhone] = await pool.query(`SELECT phone FROM users WHERE phone = ? `, [phone]);
        if (validatePhone.length) {
            return res.status(409).json({
                valid: false,
                message: "El telefono ya se encuentra registrado"
            });
        } else {
            return res.status(200).json({
                valid: true,
                message: "El telefono es valido "
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