import express from "express";
import cors from 'cors';
import { userRoutes } from "./modules/users/user.router.js";
import { productRoutes } from "./modules/products/product.routes.js";
import cookieParser from "cookie-parser";
import { orderRoutes } from "./modules/orders/orders.routes.js";

const app = express(); // creating the express app

app.use(cors())// registering the cors middleware
app.use(express.json()); // registering the express.json middleware to parse incoming JSON requests
app.use(cookieParser());// registering the cookie-parser middleware to parse cookies in incoming requests

app.get('/', (req, res) => {
    res.send("Bulbul bhai shop api is running")
})

app.use('/api/auth', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/order-test', (req, res) => {
    res.json({ message: "Order test route is working!" });
});

export default app;