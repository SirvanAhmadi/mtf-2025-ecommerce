import type { SubCategory } from "./SubCategory";

export interface Category {
    id: number;
    name:string;
    slug:string;
    description:string;
    image:string;
    sub_categories:SubCategory[];
    created_at:string;
    updated_at:string;
}