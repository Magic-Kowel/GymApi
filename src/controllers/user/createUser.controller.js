import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE, STATUS_TYPE_USER } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createUser = async (req, res) => {
    try {
        const { name, middle_name, last_name, email, birthdate, phone } = req.body;

        if (!name || !middle_name || !last_name || !email || !birthdate || !phone) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [validateEmail] = await pool.query(`SELECT email FROM users WHERE email = ? `, [email]);
        if (validateEmail.length) {
            return res.status(409).json({
                created: false,
                message: "El correo electrónico ya se encuentra registrado"
            });
        }
        const [validatePhone] = await pool.query(`SELECT email FROM users WHERE phone = ? `, [phone]);
        if (validatePhone.length) {
            return res.status(409).json({
                created: false,
                message: "El Telefono ya se encuentra registrado"
            });
        }
        const [row] = await pool.query(`INSERT INTO users(
            id_user_type,
            id_status,
            name,
            middle_name,
            last_name,
            email,
            birthdate,
            phone
            ) VALUES (?,?,?,?,?,?,?,?)`, [
            STATUS_TYPE_USER,
            STATUS_ACTIVE,
            name,
            middle_name,
            last_name,
            email,
            birthdate,
            phone
        ]);
        return res.status(200).json({
            created: true,
            message: SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}