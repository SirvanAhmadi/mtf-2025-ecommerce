import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetcher, useNavigate } from 'react-router';
import type { z } from 'zod';
import { createBrandSchma } from '~/validation';

type FormData = z.infer<typeof createBrandSchma>;

const AddBrands = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(createBrandSchma),
    });

    const [prev, setPrev] = useState<string | null>(null);
    const fetcher = useFetcher();
    const actionData = fetcher.data as { success: boolean; message: string } | undefined;
    const navigate = useNavigate();

    const handleOnSubmit = (data: FieldValues) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image[0]);

        const slug = data.name.replace(/\s+/g, '-').toLowerCase();
        formData.append('slug', slug);

        fetcher.submit(formData, {
            method: 'post',
            encType: 'multipart/form-data',
        });
    };

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                toast.success(actionData.message);
                navigate('/admin/categories');
            } else {
                toast.error(actionData.message);
            }
        }
    }, [actionData, navigate]);

    return (
        <div className="flex h-full justify-center items-center">
            <fetcher.Form className="p-10 bg-base-300" onSubmit={handleSubmit(handleOnSubmit)}>
                <fieldset className="fieldset">
                    {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                    <label className="fieldset-legend">
                        <span>نام دسته بندی</span>
                    </label>
                    <input className="input" type="text" {...register('name')} placeholder="آرایشی" />
                </fieldset>
                <fieldset className="fieldset">
                    {errors.country && <span className="text-sm text-red-500">{errors.country.message}</span>}
                    <label className="fieldset-legend">
                        <span>کشور</span>
                    </label>
                    <input className="input" type="text" {...register('country')} placeholder="آرایشی" />
                </fieldset>
                <fieldset className="fieldset">
                    {errors.website_url && <span className="text-sm text-red-500">{errors.website_url.message}</span>}
                    <label className="fieldset-legend">
                        <span>سایت برند</span>
                    </label>
                    <input className="input" type="text" {...register('website_url')} placeholder="آرایشی" />
                </fieldset>
                <fieldset className="fieldset">
                    {errors.description && <span className="fieldset-label text-sm text-red-500">{errors.description.message}</span>}
                    <label className="fieldset-legend">
                        <span>توضیحات دسته بندی</span>
                    </label>
                    <textarea className="textarea" {...register('description')} placeholder="این دسته بندی برای ..." />
                </fieldset>

                {/* Image preview */}
                <div className="overflow-hidden my-5 w-72 h-72 flex border-2 border-gray-400 justify-center items-center rounded-xl border-dashed">
                    {prev ? (
                        <img src={prev} className="w-full h-full block object-cover object-center" alt="Preview" />
                    ) : (
                        <span className="text-sm text-info">عکسی انتخاب نشده است!</span>
                    )}
                </div>

                <fieldset>
                    <label className="btn btn-block" htmlFor="cate_image">
                        عکس دسته بندی
                    </label>
                    <input
                        id="cate_image"
                        onInput={(event) => {
                            const file = (event.target as HTMLInputElement).files?.[0];
                            if (file) {
                                setPrev(URL.createObjectURL(file));
                            }
                        }}
                        className="hidden"
                        type="file"
                        {...register('logo')}
                    />
                </fieldset>
                <button disabled={fetcher.state !== 'idle'} className="btn mt-3 btn-block bg-black text-white">
                    ثبت دسته بندی
                    {fetcher.state !== 'idle' && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </fetcher.Form>
        </div>
    );
};

export default AddBrands;