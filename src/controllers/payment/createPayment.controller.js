import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_ACTIVE } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createPayment = async (req, res) => {
    // 1. Obtener una conexión individual del pool (OBLIGATORIO para transacciones)
    try {
        const { userId, membershipId, price } = req.body;
        if (!userId || !membershipId || !price) {
            return res.status(400).json({
                created: false,
                message: "Faltan parámetros obligatorios"
            });
        }
        const connection = await pool.getConnection();


        // 2. Iniciar la transacción
        await connection.beginTransaction();
        const startDate = new Date();
        const endDate = new Date();

        const [membership] = await connection.query(`SELECT 
            membership.id_membership,
            membership.name,
            membership.price,
            membership.id_status,
            membership.days
            FROM membership
            INNER JOIN status on status.id_status = membership.id_status 
            WHERE  membership.id_membership = ? ;`, [membershipId]);
        endDate.setDate(endDate.getDate() + membership[0].days);


        // 3. Primera consulta: Crear el usuario
        const [subscriptionResult] = await connection.query(
            `INSERT INTO subscription(
                id_user, 
                id_membership, 
                id_status,
                start_time,
                end_time
            ) VALUES (?, ?, ?, ?,?)`,
            [userId, membershipId, STATUS_ACTIVE, startDate, endDate]
        );
        const newSubscriptionId = subscriptionResult.insertId;

        // 4. Segunda consulta: Asignar la membresía al usuario creado
        await connection.query(
            `INSERT INTO payment(id_user, id_subscription, id_status, amount) VALUES (?, ?, ?, ?)`,
            [userId, newSubscriptionId, STATUS_ACTIVE, price]
        );

        // 5. Confirmar y guardar todos los cambios si todo salió bien
        await connection.commit();
        return res.status(200).json({
            created: true,
            message: SUCCESS_MESSAGE_INSERT
        });

    } catch (error) {
        // 6. Si ocurrió algún error en cualquier paso, deshacer todos los cambios
        await connection.rollback();
        console.error(error);
        logger.error(error);
        res.status(500).json({
            message: error
        })
        throw error;

    } finally {
        // 7. SIEMPRE liberar la conexión de vuelta al pool
        connection.release();
    }
};