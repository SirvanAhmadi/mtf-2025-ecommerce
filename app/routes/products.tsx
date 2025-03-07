import { BASE_URL_API, fetchWithRetry } from "~/apiClient"
import type { Route } from "./+types/products"
import type { ApiResponse } from "~/types/ApiResponse"
import type { Product } from "~/types/Product"
import ProductCard from "~/components/ProductCard"

export async function loader({params}:Route.LoaderArgs):Promise<ApiResponse<Product>>{

    const productRes = await fetchWithRetry(BASE_URL_API + "/products?page=1&limit=5&sub_category=" + params.subCateId)

    const productsData = await productRes.json()

    return productsData
}

const ProductsPage = ({loaderData}:Route.ComponentProps) => {
    const {data} = loaderData as unknown as  ApiResponse<Product>;
  return (
    <div>
        <section className="grid grid-cols-4">
            {data.map(pro => (
                <ProductCard product={pro} key={pro.id} />
            ))}
        </section>      
    </div>
  )
}

export default ProductsPage