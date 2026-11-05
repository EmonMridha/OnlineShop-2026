import { prisma } from "../../lib/prisma.js"
import { ICreateOrder } from "./orders.interface.js"

const createOrder = async (order: ICreateOrder) => {

    const productIds = order.items.map(i => i.productId) // getting product ids ordered by the customer. here each product can be ordered multiple times 

    // fetching the products from the database that the customer has ordered
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: order.items.map(item => item.productId)
            },
            isActive: true
        },
    })

    // Creating a Map of fetched product from database
    const productMap = new Map(products.map(p => [p.id, p]))
    // see the usage of Map(very easy)

    // checking if the number of products ordered by the customer is equal to the number of products fetched from the database. If not, it means that one or more products are invalid or unavailable
    if (productMap.size !== new Set(productIds).size) {
        throw new Error("One or more products are invalid or unavailable")
    } // Set removes duplicate elements from an array and keeps them only once

    // finding total price of the ordered items
    const total = order.items.reduce((sum, item) => {

        const product = productMap.get(item.productId)!

        return sum + Number(product.price) * item.quantity;
    }, 0)

    // adding the order to the database and returning the result
    const result = await prisma.order.create({
        data: {
            customerName: order.customerName,
            phone: order.phone,
            address: order.address,
            total,
            items: {
                create: order.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: productMap.get(item.productId)!.price
                }))
            }
        },
        include: { items: true }
    })

    return result;
}

export const orderService = {
    createOrder
}