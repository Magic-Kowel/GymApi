import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE, STATUS_TYPE_USER } from "../../config.js";
export const getUsers = async (req, res) => {
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
            where status.id_status = ? AND user_type.id_user_type = ? ;`, [STATUS_ACTIVE, STATUS_TYPE_USER]);
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}