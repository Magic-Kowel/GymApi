import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateAdmind = async (req, res) => {
    console.log(req.body);

    try {
        const {
            name,
            middle_name,
            last_name,
            email,
            phone,
            birthdate,
            admindId
        } = req.body;
        const [result] = await pool.query(`UPDATE users
        SET name= IFNULL(?,name),
        middle_name= IFNULL(?,middle_name),
        last_name= IFNULL(?,last_name),
        email= IFNULL(?,email),
        phone= IFNULL(?,phone),
        birthdate= IFNULL(?,birthdate) 
        WHERE users.id_user = ?`,
            [
                name,
                middle_name,
                last_name,
                email,
                phone,
                birthdate,
                admindId
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