import { prisma } from "../../lib/prisma.js";
import { IProduct } from "./product.interface.js";

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

const getSingleProduct = async () => {

}

const updateProduct = async () => {

}

const deleteProduct = async () => {

}

export const productService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}