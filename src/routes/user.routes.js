import { Router } from "express";
import { getUsers } from "../controllers/user/getUsers.controller.js";
import { createUser } from "../controllers/user/createUser.controller.js";
import { deleteUser } from "../controllers/user/deleteUser.controller.js";
import { getUser } from "../controllers/user/getUser.controller.js";
import { updateUser } from "../controllers/user/updateUser.controller.js";
import { getUserByPhone } from "../controllers/user/getUserByPhone.controller.js";
import { validateEmail } from "../controllers/user/validateEmail.controller.js";
import { validatePhone } from "../controllers/user/validatePhone.controller.js";
import { validateEmailUpdate } from "../controllers/user/validateEmailUpdate.controller.js";
import { login } from "../controllers/user/login.controller.js";
import { validatePhoneUpdate } from "../controllers/user/validatePhoneUpdate.controller.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
router.get("/users", verifyToken, getUsers);
router.post("/user", createUser);
router.delete("/user/:idUser", verifyToken, deleteUser);
router.get("/user/:idUser", getUser);
router.put("/user", verifyToken, updateUser);

router.get("/validate/email/:email", validateEmail);
router.get("/validate/update/email/:email/:id", validateEmailUpdate);
router.get("/validate/phone/:phone", validatePhone);
router.get("/validate/update/phone/:phone/:id", validatePhoneUpdate);
router.get("/userbyphone/:phone", getUserByPhone);

router.post("/login", login)
export default router;