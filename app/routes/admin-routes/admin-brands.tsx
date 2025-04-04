import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router';
import { fetchWithRetry, BASE_URL_API } from '~/apiClient';
import type { Route } from './+types/admin-brands';
import type { Brand } from '~/types/Brand';


interface LoaderData {
    data: Brand[];
}

export async function loader(): Promise<LoaderData> {
    const brandRes = await fetchWithRetry(BASE_URL_API + '/brands');
    const brandData = await brandRes.json();
    return {
        data: brandData.data as Brand[],
    };
}


interface AdminBrandsProps extends Route.ComponentProps {
    loaderData: LoaderData;
}


const AdminBrands = ({ loaderData }: AdminBrandsProps) => {
    const { data: brands } = loaderData;

    return (
        <div className="h-full">
            <div className="p-10 flex justify-between">
                <h2 className="text-2xl">برندها</h2>
                <Link to="/admin/add-brand" className="btn bg-outer-space text-white">
                    + اضافه کردن برند
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="hidden md:block">پوستر</th>
                            <th>نام برند</th>
                            <th>عملیات ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands &&
                            brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td className="hidden md:table-cell">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-14 w-14">
                                                    <img
                                                        src={brand.logo}
                                                        width={50}
                                                        height={50}
                                                        alt={`لوگوی ${brand.name}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="font-medium">{brand.name}</p>
                                    </td>
                                    <th>
                                        <div className="flex items-center gap-3">
                                            <Link to={`/admin/products/${brand.slug}`}>
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

export default AdminBrands;