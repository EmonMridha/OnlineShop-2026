import { Prisma } from "../../generated/prisma/client.js";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    imageURL: string;
    stock?: number;
}
export interface UProduct {
    name?: string
    description?: string;
    price?: number;
    imageURL?: string;
    stock?: number;
}

