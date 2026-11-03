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

const getAllProducts = async () => {
    const result = await prisma.product.findMany();

    if (result.length === 0) {
        throw new Error("No products found")
    }

    return result;
}

const getSingleProduct = async (id: string) => {

    const result = prisma.product.findUniqueOrThrow({
        where: {
            id
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
    await prisma.product.delete({
        where: { id }
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