import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateMembership = async (req, res) => {
    try {
        const {
            name,
            price,
            days,
            membershipId
        } = req.body;
        if (!name || !price || !days || !membershipId) {
            return res.status(400).json({
                updated: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [result] = await pool.query(`UPDATE membership
        SET name= IFNULL(?,name),
        price= IFNULL(?,price),
        days= IFNULL(?,days)
        WHERE membership.id_membership = ?`,
            [
                name,
                price,
                days,
                membershipId
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