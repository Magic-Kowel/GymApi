import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateUser = async (req, res) => {
    try {
        const {
            name,
            middle_name,
            last_name,
            email,
            phone,
            birthdate,
            userId
        } = req.body;
        if (!name ||
            !middle_name ||
            !last_name ||
            !email ||
            !phone ||
            !birthdate ||
            !userId) {
            return res.status(400).json({
                updated: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [result] = await pool.query(`UPDATE users
        SET name= IFNULL(?,name),
        middle_name= IFNULL(?,middle_name),
        last_name= IFNULL(?,last_name),
        email= IFNULL(?,email),
        phone= IFNULL(?,phone),
        birthdate= IFNULL(?,birthdate) 
        WHERE users.id_user = ?`,
            [
                name,
                middle_name,
                last_name,
                email,
                phone,
                birthdate,
                userId
            ]);
        if (result.affectedRows > 0) {
            return res.status(200).json({
                updated: true,
                message: SUCCESS_MESSAGE_UPDATE
            });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}