import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_TYPE_ADMIND, STATUS_ACTIVE } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
import bcrypt from "bcryptjs";
import { GENERATION_NUMBER } from "../../config.js";
export const createAdmind = async (req, res) => {

    try {
        const { name, middle_name, last_name, email, birthdate, phone, password } = req.body;
        if (!name ||
            !middle_name ||
            !last_name ||
            !email ||
            !birthdate ||
            !phone ||
            !password) {
            return res.status(400).json({
                created: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const salt = await bcrypt.genSalt(GENERATION_NUMBER);
        const passwordEncript = await bcrypt.hash(password, salt);
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
                    phone,
                    password
                    ) VALUES (?,?,?,?,?,?,?,?,?)`, [
            STATUS_TYPE_ADMIND,
            STATUS_ACTIVE,
            name,
            middle_name,
            last_name,
            email,
            birthdate,
            phone,
            passwordEncript
        ]);
        //row.affectedRows
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