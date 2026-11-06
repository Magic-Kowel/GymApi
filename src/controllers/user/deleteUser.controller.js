import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_DELETE } from "../../config.js";
import {
    SUCCESS_MESSAGE_DELETE,
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        if (!id) {
            return res.status(400).json({
                delete: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const [result] = await pool.query(`UPDATE users 
        SET id_status = ?
        WHERE id_user = ?`, [STATUS_DELETE, id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: ERROR_MESSAGE_GENERIC
            });
        }
        return res.status(200).json({
            delete: true,
            message: SUCCESS_MESSAGE_DELETE
        });
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}