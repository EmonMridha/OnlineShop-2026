import express from "express";
import cors from 'cors';
import { userRoutes } from "./modules/users/user.router.js";
import { productRoutes } from "./modules/products/product.routes.js";
import cookieParser from "cookie-parser";
import { orderRoutes } from "./modules/orders/orders.routes.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Bulbul bhai shop api is running")
})

app.use('/api/auth', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

export default app;