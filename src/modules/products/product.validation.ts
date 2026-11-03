import z from "zod";

const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number().positive("Price must be greater than 0"),
    imageURL: z.url("Please provide a valid url"),
    stock: z.number().int().min(0).optional()
})
const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required").optional(),
    description: z.string().min(1, "Product description is required").optional(),
    price: z.number().positive("Price must be greater than 0").optional(),
    imageURL: z.url("Please provide a valid url").optional(),
    stock: z.number().int().min(0).optional()
})

export const productValidation = {
    createProductSchema,
    updateProductSchema
}