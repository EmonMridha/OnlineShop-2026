import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

router.post('/register', userController.createAdmin)

export const userRoutes = router;