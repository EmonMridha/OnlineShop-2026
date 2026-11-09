import { catchAsync } from "../../utils/catchAsync.js";
import { orderService } from "./orders.service.js";
import httpStatus from "http-status"

const createOrder = catchAsync(async (req, res) => {
    const payload = req.body;
    console.log("Payload received in orderController:", payload); // Log the payload to check its structure

    const result = await orderService.createOrder(payload);

    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Order created successfully",
        data: result
    })
})

const getOrders = catchAsync(async (req, res) => {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const result = await orderService.getOrders(page, limit)
    res.status(httpStatus.OK).json({
        success: true,
        message: 'All order retrieved successfully',
        data: result
    })
})

export const orderController = {
    createOrder,
    getOrders
}