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

const getAllProducts = async() => {
    const result = await prisma.product.findMany();

    return result;
}

export const productService = {
    createProduct,
    getAllProducts
}