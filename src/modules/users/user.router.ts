import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { userValidation } from "./user.validation.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post('/register', validateRequest(userValidation.createAdmin), userController.createAdmin)
router.post('/login', validateRequest(userValidation.loginAdmin), userController.loginAdmin)
router.get('/me', auth('ADMIN', "CUSTOMER"), userController.getMyProfile)

export const userRoutes = router;