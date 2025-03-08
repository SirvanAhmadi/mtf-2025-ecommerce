import type { Product } from "~/types/Product"
import {Link} from "react-router";

const ProductCard = ({product}:{product:Product}) => {
  return (
    <Link to={"/product-detail/" + product.slug} className="card bg-base-100 w-xs shadow-sm">
  <figure>
    <img
      src={product.poster}
      alt={product.alt_text}
      className={"w-xs h-72 object-cover object-center"}
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {product.title}
      <div className="badge badge-secondary">{product.brand.name}</div>
    </h2>
    <p></p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</Link>
  )
}

export default ProductCard