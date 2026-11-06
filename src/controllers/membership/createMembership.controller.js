import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createMembership = async (req, res) => {
    try {
        const { name, price, days } = req.body;
        if (!name || !price || !days) {
            return res.status(400).json({
                created: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [row] = await pool.query(`INSERT INTO membership(
            id_status,name,price,days
            ) VALUES (?,?,?,?)`, [
            STATUS_ACTIVE,
            name,
            price,
            days
        ]);
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