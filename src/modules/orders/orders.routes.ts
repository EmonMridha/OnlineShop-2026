import { Router } from "express";
import { orderController } from "./order.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createOrderSchema } from "./orders.validation.js";

const router = Router();

router.post("/", validateRequest(createOrderSchema), orderController.createOrder)

export const orderRoutes = router