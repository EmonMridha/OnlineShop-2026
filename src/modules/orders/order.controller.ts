import { catchAsync } from "../../utils/catchAsync.js";
import { orderService } from "./orders.service.js";
import httpStatus from "http-status"

const createOrder = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await orderService.createOrder(payload);

    res.status(httpStatus.CREATED).json({
        success: true,
        message: "Order created successfully",
        data: result
    })
})

export const orderController = {
    createOrder
}