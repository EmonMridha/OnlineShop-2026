import z from "zod";

const createAdmin = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters")
});

export const userValidation = {
    createAdmin
}