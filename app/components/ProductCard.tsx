import type { Product } from "~/types/Product"

const ProductCard = ({product}:{product:Product}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={product.poster}
      alt={product.alt_text} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {product.title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p></p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
  )
}

export default ProductCard