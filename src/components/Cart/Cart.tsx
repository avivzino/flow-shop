import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./Cart.css";
import { CartItem } from "./CartItem/CartItem";

export const Cart = () => {
  const { cartItems, machine, totalPrice } = useAppContext();

  const cartIsNotEmpty = cartItems.length > 0;

  return (
    <div className="screen-wrapper animate__animated animate__fadeIn">
      <div className="flex justify-content-space-between align-items-center">
        <h1 className="title">CART</h1>
        {cartIsNotEmpty && (
          <button
            className="primary-btn"
            onClick={() => machine.transition(EventsEnum.GO_TO_CHECKOUT)}
          >
            Go To Checkout
          </button>
        )}
      </div>
      {cartIsNotEmpty ? (
        cartItems.map((item) => <CartItem key={item.key} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartIsNotEmpty && (
        <h2 className="total-amount">Total: {totalPrice.toFixed(2)}$</h2>
      )}
    </div>
  );
};
