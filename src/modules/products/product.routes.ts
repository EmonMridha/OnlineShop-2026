import { Router } from "express";
import { productController } from "./product.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { productValidation } from "./product.validation.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post('/', auth("ADMIN"), validateRequest(productValidation.createProductSchema), productController.createProduct)
router.get('/', productController.getAllProducts)

export const productRoutes = router