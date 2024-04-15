import { useAppContext } from "../../../context";
import { CartItemData } from "../../../types/app.types";

export const CartItem = ({ item }: { item: CartItemData }) => {
  const {
    removeProductFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleSizeChange,
  } = useAppContext();

  return (
    <div key={item.key} className="item">
      <div style={{ width: "50%" }}>
        <p style={{ fontSize: 18 }}>{item.title}</p>
        <h3 style={{ fontWeight: 500, fontSize: 18 }}>
          {item.quantity} x {item.price.toFixed(2)}$ ={" "}
          {(item.quantity * item.price).toFixed(2)}$
        </h3>
        <div className="size-selector flex align-items-center">
          <label htmlFor={`size-${item.id}`} className="size-label">
            Size:
          </label>
          <select
            id={`size-${item.id}`}
            className="size-select"
            value={item.size}
            onChange={(e) => handleSizeChange(item.key, e.target.value)}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
      </div>
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="quantity-choosing flex align-items-center">
        <button
          className="quantity-button cursor-pointer"
          onClick={() => handleDecreaseQuantity(item.key)}
        >
          -
        </button>
        <div>{item.quantity}</div>
        <button
          className="quantity-button cursor-pointer"
          onClick={() => handleIncreaseQuantity(item.key)}
        >
          +
        </button>
      </div>
      <button
        className="remove-item-btn cursor-pointer"
        onClick={() => removeProductFromCart(item.key)}
      >
        X
      </button>
    </div>
  );
};
