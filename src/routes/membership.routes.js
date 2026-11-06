import { Router } from "express";
import { getMemberships } from "../controllers/membership/getMemberships.controller.js";
import { getMembership } from "../controllers/membership/getMembership.controller.js";
import { updateMembership } from "../controllers/membership/UpdateMembership.controller.js";
import { createMembership } from "../controllers/membership/createMembership.controller.js";
import { deleteMembership } from "../controllers/membership/deleteMembership.controller.js";
const router = Router();
router.get("/memberships",getMemberships)
router.get("/membership/:idMembership",getMembership)
router.put("/membership",updateMembership)
router.post("/membership",createMembership)
router.delete("/membership/:idMembership",deleteMembership)
export default router;