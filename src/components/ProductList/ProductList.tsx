import { useProductData } from "../../hooks/useProductData";
import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./ProductList.css";
import { Product } from "./Product/Product";

export const ProductList = () => {
  const { products, isLoading, error, handleSizeChange } = useProductData();
  const { showPopup, machine } = useAppContext();

  return (
    <div className="product-list-wrapper">
      <h1 className="products-title title animate__animated animate__fadeInDown">
        BEST SELLING
      </h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div className="animate__animated animate__fadeInUp">{error}</div>
      ) : (
        <div className="product-list flex justify-content-center">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleSizeChange={handleSizeChange}
            />
          ))}
        </div>
      )}
      {showPopup && (
        <div className="popup animate__animated animate__fadeInUp">
          <p style={{ margin: 0 }}>Item added to cart!</p>
          <button
            className="primary-btn"
            style={{ marginTop: 20 }}
            onClick={() => machine.transition(EventsEnum.VIEW_CART)}
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};
