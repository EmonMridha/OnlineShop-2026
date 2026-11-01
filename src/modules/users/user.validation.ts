import z from "zod";

const createAdmin = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters")
});

const loginAdmin = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, "Password is required")
})

export const userValidation = {
    createAdmin,
    loginAdmin
}