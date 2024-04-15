import { useAppContext } from "../../../context";
import { ProductData } from "../../../types/app.types";

interface Props {
  product: ProductData;
  handleSizeChange: (productId: number, newSize: string) => void;
}

export const Product = ({ product, handleSizeChange }: Props) => {
  const { addProductToCart } = useAppContext();

  return (
    <div className="product" key={product.id}>
      <img src={product.image} className="product-image" />
      <span className="price">{product.price}$</span>
      <div className="size-selector flex align-items-center">
        <label htmlFor={`size-${product.id}`} className="size-label">
          Size:
        </label>
        <select
          id={`size-${product.id}`}
          value={product.size}
          onChange={(e) => handleSizeChange(product.id, e.target.value)}
          className="size-select"
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>
      <button className="primary-btn" onClick={() => addProductToCart(product)}>
        + Add To Cart
      </button>
    </div>
  );
};
