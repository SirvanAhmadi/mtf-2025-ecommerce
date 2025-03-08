import {z} from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(2,"نام دسته بندی حداقل باید 2 حرف باشد").max(255,"ماکسیموم اسم کتگوری 255 حرف است!"),
    description: z.string().trim().min(2,"حداقل توضیحات باید 2 حرف باشد").max(64000,"توضیحات طولانیست!"),
    image: z.any(),
})