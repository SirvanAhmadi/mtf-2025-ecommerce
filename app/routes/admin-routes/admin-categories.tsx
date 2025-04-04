import { Link } from 'react-router';
import { FiEdit2 } from 'react-icons/fi';
import { BASE_URL_API, fetchWithRetry } from '~/apiClient';
import type { Category } from '~/types/Category';
import type { Route } from '../../../.react-router/types/app/routes/admin-routes/+types/admin-categories';

interface LoaderData {
    data: Category[];
}

export async function loader(): Promise<LoaderData> {
    const cateRes = await fetchWithRetry(BASE_URL_API + '/categories');
    const cateData: Category[] = await cateRes.json();
    return {
        data: cateData,
    };
}

interface AdminCategoriesProps extends Route.ComponentProps {
    loaderData: LoaderData;
}

const AdminCategories = ({ loaderData }: AdminCategoriesProps) => {
    const { data: categories } = loaderData;

    return (
        <div className="h-full">
            <div className="p-10 flex justify-between">
                <h2 className="text-2xl">دسته بندی ها</h2>
                <Link to="/admin/add-category" className="btn bg-outer-space text-white">
                    + اضافه کردن دسته بندی
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>نام دسته بندی</th>
                            <th className="hidden md:table-cell">تعداد زیر دسته بندی</th>
                            <th>عملیات ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories &&
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        <p className="font-medium">{category.name}</p>
                                        <p className="text-green-600 md:hidden badge my-2">
                                            {category.sub_categories?.length || 'دسته بندی ندارد'}
                                        </p>
                                    </td>
                                    <td className="hidden text-[#185E57] md:table-cell">
                                        {category.sub_categories?.length || 'دسته بندی ندارد'}
                                    </td>
                                    <th>
                                        <div className="flex items-center gap-3">
                                            <Link to={`/admin/products/${category.slug}`}>
                                                <FiEdit2 className="text-blue-600 w-4 h-4" />
                                            </Link>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;