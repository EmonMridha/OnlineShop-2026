import { prisma } from "../../lib/prisma.js"
import { ICreateOrder } from "./orders.interface.js"

const createOrder = async (order: ICreateOrder) => {

    // fetching only the products that the customer has ordered
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: order.items.map(item => item.productId)
            },
            isActive: true
        },
    })

    if (products.length !== order.items.length) {
        throw new Error("One or more products are invalid or unavailable")
    }

    // finding total price of the ordered items
    const total = order.items.reduce((sum, item) => {

        const product = products.find(p => p.id === item.productId)!; // finding product that matches the item.productId

        return sum + Number(product.price) * item.quantity;
    }, 0)

    const result = await prisma.order.create({
        data: {
            customerName: order.customerName,
            phone: order.phone,
            address: order.address,
            total: total,
            items: {
                create: [
                    {
                        productId: "product_1",
                        quantity: 2,
                        price: 500
                    },
                    {
                        productId: "product_2",
                        quantity: 1,
                        price: 500
                    }
                ]
            }
        }
    })

    return result;
}

export const orderService = {
    createOrder
}