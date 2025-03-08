import type {SubCategory} from "~/types/SubCategory";

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    poster:string;
    alt_text: string;
    brand:{
        name:string;
    }
    sub_categories: SubCategory[];
}