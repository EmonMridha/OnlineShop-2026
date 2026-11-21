import { number, promise } from "zod";
import { prisma } from "../../lib/prisma.js";
import { IProduct, UProduct } from "./product.interface.js";

// Post product 
const createProduct = async (payload: IProduct) => {

    const { name, description, price, imageURL, stock } = payload;

    const result = await prisma.product.create({
        data: {
            name,
            description,
            price,
            imageURL,
            stock
        }
    })

    return result;
}

const getAllProducts = async (page: number, limit: number) => {

    const skip = (page - 1) * limit

    const [products, totalProducts] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: Number(limit),
            orderBy: {
                createdAt: "desc"
            }
        }),
        prisma.product.count()
    ])

    const totalPages = Math.ceil(totalProducts / limit);

    return {
        meta: {
            page,
            limit,
            totalProducts,
            totalPages
        },
        data: products,
    }
}

const getSingleProduct = async (id: string) => {

    const result = await prisma.product.findUniqueOrThrow({
        where: {
            id,
            isActive: true
        }
    })

    return result;
}

const updateProduct = async (id: string, payload: UProduct) => {
    if (!id) {
        throw new Error("Product id is required")
    }

    const product = await prisma.product.findUniqueOrThrow({ where: { id } })

    if (!product) {
        throw new Error("Product not found")
    }

    const result = await prisma.product.update({
        where: { id },
        data: payload
    })

    return result;
}

const deleteProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) {
        throw new Error("Product not found")
    }

    // delete product 
    await prisma.product.update({
        where: { id },
        data: {
            isActive: false
        }
    })

    return;
}

export const productService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}