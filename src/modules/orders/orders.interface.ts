export interface ICreateOrder {
    customerName: string;
    phone: string;
    address: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}