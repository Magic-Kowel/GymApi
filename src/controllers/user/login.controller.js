import { pool } from "../../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE } from "../../config.js";
import { NOT_LOGIN, LOGIN } from "../../messagesSystem.js";
import { SECRET_KEY } from "../../config.js";
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                valid: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [user] = await pool.query(`
            SELECT email,
            password
            FROM users 
            WHERE email = ? AND id_status `, [email, STATUS_ACTIVE]);
        if (user.length == 0) {
            return res.status(401).json({
                auth: false,
                message: NOT_LOGIN
            });
        }
        console.log(user[0].password);
        const isPasswordValid = await bcrypt.compare(String(password), user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({
                auth: false,
                message: NOT_LOGIN
            });
        }
        console.log(2);
        const token = jwt.sign({
            //aqui pon data
        },
            SECRET_KEY,
            {
                expiresIn: '7d'
            });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 86400 * 1000, // 👈 ¡FALTABA LA COMA AQUÍ!
            path: '/'
        });
        return res.status(200).json({
            auth: true,
            message: LOGIN,
            token: token
        });
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}