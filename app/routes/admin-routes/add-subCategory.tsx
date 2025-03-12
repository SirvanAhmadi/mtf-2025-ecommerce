import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useFetcher, useNavigate, useRouteLoaderData } from "react-router";
import type { z } from "zod";
import { fetchWithRetry, BASE_URL_API } from "~/apiClient";
import type { Category } from "~/types/Category";
import { createSubCategorySchema } from "~/validation";
import type { Route } from "./+types/admin-subCategories";
import { uploadImage } from "~/.server/cloud-services";
import toast from "react-hot-toast";

export async function loader(){
    const cateRes = await fetchWithRetry(BASE_URL_API + "/categories")

    const cateData:Category[] = await cateRes.json();
    return {
        data: cateData,
    };
}

type formData = z.infer<typeof createSubCategorySchema>

const AddSubCategory = ({loaderData}:Route.ComponentProps) => {

    const {data:categories} = loaderData

    const {handleSubmit,register,formState:{errors}} = useForm<formData>({
        resolver: zodResolver(createSubCategorySchema)
    });

    const [prev, setPrev] = useState("");

    const fetcher = useFetcher();
    const actionData = fetcher.data as {success:boolean;message:string}

    const navigate = useNavigate();

    const handelOnSubmit = (data:FieldValues) => {
            console.log(data);
    
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("image", data.image[0]);
    
            const slug = data.name.replace(/\s+/g, "-").toLowerCase();
    
            formData.append("slug", slug);
            formData.append("parent_category_id",data.parent_category_id)
    
            fetcher.submit(formData, {
                method: "post",
                encType: "multipart/form-data",
            });
    }

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                toast.success(actionData.message);
                navigate("/admin/sub-categories");
            } else {
                toast.error(actionData.message)
            }
        } 
    },[actionData,navigate])

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
                            نام زیر دسته بندی
                        </span>
                    </label>
                    <input className={"input"} type="text" {...register("name")} placeholder={"آرایشی"} />
                </fieldset>

                <fieldset className="fieldset">
                {errors.parent_category_id && (
                        <span className={"fieldset-label text-sm text-red-500"}>
                            {errors.parent_category_id.message}
                        </span>
                    )}
                    <label className="fieldset-legend" htmlFor="">
                        دسته بندی والد
                    </label>
                <select {...register("parent_category_id",{
                    valueAsNumber:true
                })} defaultValue="Pick a color" className="select">
                <option value={""}>یک دسته بندی را انتخاب کنید</option>
                    {categories.map(cate => (
                        <option value={cate.id}>
                            {cate.name}
                        </option>
                    ))}
                </select>
                </fieldset>
                <fieldset className={"fieldset"}>
                    {errors.description && (
                        <span className={"fieldset-label text-sm text-red-500"}>
                            {errors.description.message}
                        </span>
                    )}
                    <label className={"fieldset-legend"}>
                        <span>
                            توضیحات زیر دسته بندی
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
                        عکس زیر دسته بندی
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

                <button disabled={fetcher.state !== "idle"} className={"btn mt-3 btn-block bg-black text-white"}>
                    ثبت زیر دسته بندی
                    {fetcher.state !== "idle" && (
                        <span className="loading loading-spinner loading-sm"></span>
                    )}
                </button>
            </fetcher.Form>
        </div>
    );
}



export async function action({request}:Route.ActionArgs){
    const formData = await request.formData();

    const reqBody = {
        name:formData.get("name"),
        description:formData.get("description"),
        slug:formData.get("slug"),
        parent_category_id: formData.get("parent_category_id"),
        image:"",
        image_key:""
    }

    const image = formData.get("image");

    const uploadResponse = await uploadImage(image as File)

    if (uploadResponse.Key && uploadResponse.Location){
        reqBody.image = uploadResponse.Location;
        reqBody.image_key = uploadResponse.Key;
    }

    const newCateResponse = await fetch(BASE_URL_API + "/sub-categories",{
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


export default AddSubCategory