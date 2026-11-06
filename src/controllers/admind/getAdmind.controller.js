import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getAdmind = async (req, res) => {
    try {
        const id = req.params.idAdmind;
        const [rows] = await pool.query(`SELECT 
                id_user,
                user_type.name as user_type,
                users.name as name,
                last_name,
                middle_name,
                phone,
                birthdate,
                email,
                status.name as status
            FROM users
            INNER JOIN user_type
            ON users.id_user_type = user_type.id_user_type
            INNER JOIN status
            ON users.id_status = status.id_status
            WHERE users.id_user = ?;`, [id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}