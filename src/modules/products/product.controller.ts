import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { productService } from "./product.service.js";
import httpStatus from 'http-status'

const createProduct = catchAsync(async (req: Request, res: Response) => {

    const payload = await req.body;

    const result = await productService.createProduct(payload)

    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Product added successfully",
        data: result
    })
})

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.getAllProducts();

    res.status(httpStatus.OK).json({
        success: true,
        message: "All Product data retrieved successfully",
        data: result
    })
})

export const productController = {
    createProduct,
    getAllProducts
}