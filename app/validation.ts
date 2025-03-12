import {z} from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    description: z.string().trim().min(2,"حداقل توضیحات باید 2 حرف باشد").max(64000,"توضیحات طولانیست!"),
    image: z.any(),
})


export const createSubCategorySchema = z.object({
    name: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    description: z.string().trim().min(2,"حداقل توضیحات باید 2 حرف باشد").max(64000,"توضیحات طولانیست!"),
    image: z.any(),
    parent_category_id: z.number({
        invalid_type_error:"انتخاب دسته بندی والد اجباریست!"
    }).min(1,"انتخاب دسته بندی والد اجباریست!")
})


export const createBrandSchma = z.object({
    name: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    country: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    description: z.string().trim().min(2,"حداقل توضیحات باید 2 حرف باشد").max(64000,"توضیحات طولانیست!"),
    logo: z.any(),
    website_url: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
})