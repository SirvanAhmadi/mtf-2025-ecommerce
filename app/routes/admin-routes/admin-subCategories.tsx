import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router';
import { fetchWithRetry, BASE_URL_API } from '~/apiClient';
import type { SubCategory } from '~/types/SubCategory';
import type { Route } from './+types/admin-subCategories';


interface LoaderData {
    data: SubCategory[];
}

export async function loader(): Promise<LoaderData> {
    const subCateRes = await fetchWithRetry(BASE_URL_API + '/sub-categories');
    const subCateData: SubCategory[] = await subCateRes.json();
    return {
        data: subCateData,
    };
}

interface AdminSubCategoryProps extends Route.ComponentProps {
    loaderData: LoaderData;
}


const AdminSubCategory = ({ loaderData }: AdminSubCategoryProps) => {
    const { data: subCategories } = loaderData;

    return (
        <div className="h-full">

            <div className="p-10 flex justify-between">
                <h2 className="text-2xl">زیر دسته بندی</h2>
                <Link to="/admin/add-subcategory" className="btn bg-outer-space text-white">
                    + اضافه کردن زیر دسته بندی
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>نام زیر دسته بندی</th>
                            <th className="hidden md:table-cell">نام دسته بندی</th>
                            <th>عملیات ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subCategories &&
                            subCategories.map((subCategory) => (
                                <tr key={subCategory.id}>
                                    <td>
                                        <p className="font-medium">{subCategory.name}</p>
                                        <p className="text-green-600 md:hidden badge my-2">
                                            {subCategory.parent_category.name}
                                        </p>
                                    </td>
                                    <td className="hidden text-[#185E57] md:table-cell">
                                        {subCategory.parent_category.name}
                                        {/*یادم باشه بپرسم چرا */}
                                    </td>
                                    <th>
                                        <div className="flex items-center gap-3">
                                            <Link to={`/admin/products/${subCategory.slug}`}>
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

export default AdminSubCategory;