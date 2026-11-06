import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getMembership= async (req, res) => {
    const id = req.params.idMembership;
    try {
        const [rows] = await pool.query(`SELECT 
            membership.id_membership,
            membership.name,
            membership.price,
            membership.id_status,
            membership.days
            FROM membership
            INNER JOIN status on status.id_status = membership.id_status 
            WHERE membership.id_membership= ? ;`,[id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}