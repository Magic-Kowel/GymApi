import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getPayments = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT
            subscription.id_subscription,
            start_time,
            end_time,
            users.name,
            users.phone,
            users.middle_name,
            users.last_name,
            membership.name
            FROM subscription 
            INNER JOIN users on users.id_user = subscription.id_user
            INNER JOIN membership on membership.id_membership = subscription.id_membership;`);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}