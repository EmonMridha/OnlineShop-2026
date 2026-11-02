import { Router } from "express";
import { productController } from "./product.controller.js";

const router = Router();

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)

export const productRoutes = router