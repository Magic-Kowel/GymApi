import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const login = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}