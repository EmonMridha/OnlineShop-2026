import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { userValidation } from "./user.validation.js";

const router = Router();

router.post('/register-admin', validateRequest(userValidation.createAdmin), userController.createAdmin)
router.post('/login-admin', validateRequest(userValidation.loginAdmin), userController.loginAdmin)

export const userRoutes = router;