export interface Product {
    id: number;
    title: string;
    price: number;
    poster:string;
    alt_text: string;
    brand:{
        name:string;
    }
}