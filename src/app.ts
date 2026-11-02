import express from "express";
import cors from 'cors';
import { prisma } from "./lib/prisma.js";
import { userRoutes } from "./modules/users/user.router.js";
import { productRoutes } from "./modules/products/product.routes.js";

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bulbul bhai shop api is running")
})

app.use('/api/auth/admin', userRoutes)
app.use('/api/products', productRoutes)

export default app;