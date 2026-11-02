import { Router } from "express";
import { productController } from "./product.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { productValidation } from "./product.validation.js";

const router = Router();

router.post('/', validateRequest(productValidation.createProductSchema), productController.createProduct)
router.get('/', productController.getAllProducts)

export const productRoutes = router