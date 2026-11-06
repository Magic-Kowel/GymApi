import { Router } from "express";
import { createAttendance } from "../controllers/attendance/createAttendance.controller.js";
const router = Router();
router.post("/attendance",createAttendance)
 
export default router;