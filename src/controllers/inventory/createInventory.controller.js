import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createAdmind = async (req, res) => {
    try {
        const { name,stock} = req.body;
        if (!name ||
            !stock) {
            return res.status(400).json({
                created: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [row] = await pool.query(`INSERT INTO inventory(
                    name,
                    stock
                    ) VALUES (?,?)`, [
            name,
            stock
        ]);
        //row.affectedRows
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