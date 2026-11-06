import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createAttendance = async (req, res) => {
    try {
        const { idUser } = req.body;
        if (!idUser) {
            return res.status(400).json({
                created: false,
                message: "Faltan parámetros obligatorios"
            });
        }

        const [payment] = await pool.query(
            `SELECT * 
            FROM attendance 
            INNER JOIN users ON users.id_user = attendance.id_user
            INNER JOIN subscription ON subscription.id_user = users.id_user
            WHERE attendance.id_user = ?
            AND DATE(attendance.start_time) = CURRENT_DATE()`,
            [idUser]
        );
        if (payment.length == 0) {
            return res.status(200).json({
                created: false,
                message: "no tiene membrecia"
            });
        }
        const [attendance] = await pool.query(
            `SELECT * FROM attendance 
            WHERE DATE(start_time) = CURDATE() 
            AND end_time IS NULL 
            AND id_user = ?`,
            [idUser]
        );
        if (attendance.length > 0) {
            return res.status(200).json({
                created: false,
                message: "El usuario ya tiene una asistencia activa el día de hoy"
            });
        }
        const [row] = await pool.query(`INSERT INTO attendance 
        (id_user, id_status) values (?,?)`, [idUser,
            STATUS_ACTIVE
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