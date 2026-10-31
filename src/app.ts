import express from "express";
import cors from 'cors';
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bulbul bhai shop api is running")
})

app.get('/text-db', async (req, res) => {
    try {

        const products = await prisma.product.findMany();

        res.json({
            success: true,
            message: "Database connected successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        })
    }
})

export default app;