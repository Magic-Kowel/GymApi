import { pool } from "../../db.js";
import logger from "../../libs/logger.js";;
export const getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    try {
        const [rows] = await pool.query(`SELECT
            id_user,
            name,
            middle_name,
            last_name
        FROM users
        WHERE phone =  ? ;`, [phone]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}