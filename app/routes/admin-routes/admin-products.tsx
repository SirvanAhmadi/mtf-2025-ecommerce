import {BASE_URL_API, fetchWithRetry} from "~/apiClient";
import type {ApiResponse} from "~/types/ApiResponse";
import type {Product} from "~/types/Product";
import type {Route} from "../../../.react-router/types/app/routes/admin-routes/+types/admin-products";
import {Link} from "react-router";
import {FiEdit2} from "react-icons/fi";


export async function loader():Promise<ApiResponse<Product>>{
    const proRes = await fetchWithRetry(BASE_URL_API + "/products?page=1&limit=5")

    const proData = await proRes.json();
    return proData;
}

const AdminProducts = ({loaderData}:Route.ComponentProps) => {

    const { data:products } = loaderData;

    return (
        <div className={"h-full"}>
                {/*  Admin Product Table   */}
            <div className={"p-10 flex justify-between"}>
                <h2 className={"text-2xl"}>
                    محصولات
                </h2>
                <button className={"btn bg-outer-space text-white"}>
                   + اضافه کردن محصول
                </button>
            </div>
            <div className={"flex justify-center items-center"}>
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className={"table"}>
                        {/* head */}
                        <thead>
                        <tr>
                            <th className={"hidden md:block"}>پوستر</th>
                            <th>نام محصول</th>
                            <th className={"hidden md:table-cell"}>دسته بندی</th>
                            <th className={"hidden md:table-cell"}>قیمت</th>
                            <th>عملیات ها</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {products &&
                            products.map((product) => {
                                const src = product.poster;
                                return (
                                    <tr key={product.id}>
                                        <td className={"hidden md:table-cell"}>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-14  w-14">
                                                        <img
                                                            src={src}
                                                            width={50}
                                                            height={50}
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className={"font-medium"}>{product.title}</p>
                                            <p className={"text-green-600 md:hidden badge my-2"}>
                                                {product.sub_categories[0].name || "دسته بندی ندارد"}
                                            </p>
                                            <p className={"text-red-600 md:hidden"}>
                                                {product.price}
                                            </p>
                                        </td>
                                        <td className={"hidden text-[#185E57] md:table-cell"}>
                                            {product.sub_categories[0].name || "دسته بندی ندارد"}
                                        </td>
                                        <th className={"hidden md:table-cell"}>
                                            <button className="btn btn-ghost text-lg btn-xs text-red-600">
                                                {product.price}
                                            </button>
                                        </th>
                                        <th>
                                            <div
                                                className={"flex items-center gap-3"}
                                            >
                                                <Link to={`/admin/products/${product.slug}`}>
                                                    <FiEdit2 className={"text-blue-600 w-4 h-4"} />
                                                </Link>
                                            </div>
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;