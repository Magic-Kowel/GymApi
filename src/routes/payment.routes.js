import { Router } from "express";
import { createPayment } from "../controllers/payment/createPayment.controller.js";
import { getPayments } from "../controllers/payment/getPayments.controller.js";
import { getPayment } from "../controllers/payment/getPayment.controller.js";
const router = Router();
router.post("/payment",createPayment)
router.get("/payments",getPayments)
router.get("/payment/:idSubscription",getPayment)
export default router;