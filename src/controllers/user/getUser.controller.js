import { pool } from "../../db.js";
import logger from "../../libs/logger.js";;
export const getUser = async (req, res) => {
    const id = req.params.idUser;
    try {
        const [rows] = await pool.query(`SELECT 
            id_user,
            status.name as status,
            user_type.name as user_type,
            users.name as name,
            middle_name,
            last_name,
            email,
            phone,
            DATE_FORMAT(birthdate, '%Y-%m-%d') AS birthdate
            FROM users 
            INNER JOIN status on status.id_status = users.id_status 
            INNER JOIN user_type on user_type.id_user_type = users.id_user_type
            where id_user = ? ;`, [id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}