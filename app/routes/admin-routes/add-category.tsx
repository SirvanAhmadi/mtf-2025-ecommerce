import {type FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createCategorySchema} from "~/validation";
import {z} from "zod";
import {useFetcher} from "react-router";
import {useState} from "react";
import type {Route} from "../../../.react-router/types/app/routes/admin-routes/+types/add-category";
import {uploadImage} from "~/.server/cloud-services";
import {BASE_URL_API} from "~/apiClient";

type formData = z.infer<typeof createCategorySchema>

const AddCategory = () => {

    const {handleSubmit,register,formState:{errors}} = useForm<formData>({
        resolver: zodResolver(createCategorySchema)
    });

    const [prev, setPrev] = useState("")

    const fetcher = useFetcher()

    const handelOnSubmit = (data:FieldValues) => {
        console.log(data);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image[0]);

        const slug = data.name.replace(/\s+/g, "-").toLowerCase();

        formData.append("slug", slug);


        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        })
    }

    return (
        <div className={"flex h-full justify-center items-center"}>
            <fetcher.Form className={"p-10 bg-base-300"} onSubmit={handleSubmit(handelOnSubmit)}>

                <fieldset className={"fieldset"}>
                    {errors.name && (
                        <span className={"text-sm text-red-500"}>
                            {errors.name.message}
                        </span>
                    )}
                    <label className={"fieldset-legend"}>
                        <span>
                            نام دسته بندی
                        </span>
                    </label>
                    <input className={"input"} type="text" {...register("name")} placeholder={"آرایشی"} />
                </fieldset>
                <fieldset className={"fieldset"}>
                    {errors.description && (
                        <span className={"fieldset-label text-sm text-red-500"}>
                            {errors.description.message}
                        </span>
                    )}
                    <label className={"fieldset-legend"}>
                        <span>
                            توضیحات دسته بندی
                        </span>
                    </label>
                    <textarea className={"textarea"} {...register("description")} placeholder={"این دسته بندی برای ..."} />
                </fieldset>

                {/* Image preview */}
                <div className={"overflow-hidden my-5 w-72 h-72 flex border-2 border-gray-400 justify-center items-center rounded-xl border-dashed"}>
                    {prev ? (
                        <img src={prev} className={"w-full h-full block object-cover object-center"} alt="test"/>
                    ) : (
                        <span className={"text-sm text-info"}>
                            عکسی انتخاب نشده است!
                        </span>
                    )}
                </div>

                <fieldset>
                    <label className={"btn btn-block "} htmlFor="cate_image">
                        عکس دسته بندی
                    </label>
                    <input id={"cate_image"} onInput={(event) => {
                        event.preventDefault();
                        // @ts-expect-error it exists
                        if (!event.target.files || !event.target.files[0]) {
                            return;
                        }

                        // @ts-expect-error it exists
                        const file = event.target.files[0];


                        const imageUrl = URL.createObjectURL(file);
                        setPrev(imageUrl);
                    }} className={"hidden"} type="file" {...register("image")} />
                </fieldset>

                <button className={"btn mt-3 btn-block bg-black text-white"}>
                    ثبت دسته بندی
                </button>
            </fetcher.Form>
        </div>
    );
};


export async function action({request}:Route.ActionArgs){
    const formData = await request.formData();

    const reqBody = {
        name:formData.get("name"),
        description:formData.get("description"),
        slug:formData.get("slug"),
        image:"",
        image_key:""
    }

    const image = formData.get("image");

    const uploadResponse = await uploadImage(image as File)

    if (uploadResponse.Key && uploadResponse.Location){
        reqBody.image = uploadResponse.Location;
        reqBody.image_key = uploadResponse.Key;
    }

    const newCateResponse = await fetch(BASE_URL_API + "/categories",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    });

    if (!newCateResponse.ok){
        return {
            success: false,
            message:"عملیات با موفقیت انجام نشد!"
        }
    }

    return {
        success: true,
        message:"با موفقیت اضافه شد!"
    }
}

export default AddCategory;