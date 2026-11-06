import { Router } from "express";
import { createAdmind } from "../controllers/admind/createAdmind.controller.js";
import { getAdminds } from "../controllers/admind/getAdminds.controller.js";
import { getAdmind } from "../controllers/admind/getAdmind.controller.js";
import { updateAdmind } from "../controllers/admind/updateAdmind.controller.js";
const router = Router();
router.post("/admind",createAdmind);
router.get("/adminds",getAdminds);
router.get("/admind/:idAdmind",getAdmind)
router.put("/admind/",updateAdmind)
export default router;