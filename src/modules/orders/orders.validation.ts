import z from "zod";

export const createOrderItemSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().int("Quantity must be a whole number").positive("Quantity must be a positive number").max(999, "Quantity too large")
})

export const createOrderSchema = z.object({
    customerName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    phone: z.string().trim().regex(/^01[3-9]\d{8}$/, 'Enter a valid Bangladeshi phone number'),
    address: z.string().trim().min(5, "Address is too short").max(500, "Too long address"),
    items: z.array(createOrderItemSchema).min(1, "Cart is empty").max(50, "Too many items in a single order. Cannot have more that 50 items in a single order")
})