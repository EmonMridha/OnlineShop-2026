import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { productService } from "./product.service.js";
import httpStatus from 'http-status'
import { Param } from "@prisma/client/runtime/client";

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

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const result = await productService.getSingleProduct(productId as string)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Single Product data retrieved successfully",
        data: result
    })
})

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct
}