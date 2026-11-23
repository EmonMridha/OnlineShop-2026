import { prisma } from "../../lib/prisma.js"
import { ICreateOrder } from "./orders.interface.js"

const createOrder = async (order: ICreateOrder) => {


    // calculating total, creating order and updating the stock
    const result = await prisma.$transaction(async (tx) => {

        const productIds = order.items.map(i => i.productId) // getting product ids ordered by the customer. 

        // fetching the products from the database that the customer has ordered
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                },
                isActive: true
            },
        })

        console.log("Products fetched:", products.length);
        console.log("Requested products:", productIds);

        // Creating a Map of fetched product from database. see the usage of Map(very easy)
        const productMap = new Map(products.map(p => [p.id, p]))

        console.log("Product map size:", productMap.size);

        // checking if the number of products ordered by the customer is equal to the number of products fetched from the database. If not, it means that one or more products are invalid or unavailable
        if (productMap.size !== order.items.length) {
            throw new Error("One or more products are invalid or unavailable")
        }

        // finding total price of the ordered items
        const total = order.items.reduce((sum, item) => {

            const product = productMap.get(item.productId)! // getting the product details from productMap

            console.log("Checking product:", {
                name: product.name,
                requestedQuantity: item.quantity,
                availableStock: product.stock
            });

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}. It's stock is only ${product.stock}`)
            }

            return sum + Number(product.price) * item.quantity;
        }, 0)

        for (const item of order.items) {
            const updateProductStock = await tx.product.updateMany({
                where: {
                    id: item.productId,
                    isActive: true,
                    stock: {
                        gte: item.quantity
                    }
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            })

            console.log("Stock update result:", {
                productId: item.productId,
                updatedCount: updateProductStock.count
            });

            if (updateProductStock.count === 0) {
                throw new Error(
                    `Insufficient stock or product unavailable: ${item.productId}`
                )
            }
        }

        console.log("Order data:", {
            customerName: order.customerName,
            phone: order.phone,
            address: order.address,
            total,
            items: order.items.map(item => ({
                productId: item.productId,
                productName: productMap.get(item.productId)?.name,
                quantity: item.quantity,
                price: productMap.get(item.productId)?.price
            }))
        });

        return await tx.order.create({
            data: {
                customerName: order.customerName,
                phone: order.phone,
                address: order.address,
                total,
                items: {
                    create: order.items.map(item => ({
                        productId: item.productId,
                        productName: productMap.get(item.productId)!.name,
                        quantity: item.quantity,
                        price: productMap.get(item.productId)!.price
                    }))
                }
            },
            include: {
                items: true
            }
        })
    })

    return result
}

const getOrders = async (page: number, limit: number) => {

    const skip = (page - 1) * limit

    // Promise.all runs multiple promises in parallel and returns the actual results in an array. Here we are destructuring the returned array.
    const [orders, totalOrders] = await Promise.all([
        // getting all the orders from the database.
        prisma.order.findMany({
            skip, // telling prisma how many records to skip
            take: Number(limit), // telling prisma how many records to take
            orderBy: {
                createdAt: "desc"
            },
            include: {
                items: true
            }
        }),

        // getting total number of orders.
        prisma.order.count()
    ])

    const totalPages = Math.ceil(totalOrders / limit)

    return {
        meta: {
            page,
            limit,
            totalOrders,
            totalPages
        },
        data: orders,
    }
}

export const orderService = {
    createOrder,
    getOrders
}