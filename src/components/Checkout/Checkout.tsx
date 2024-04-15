import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./Checkout.css";

export const Checkout = () => {
  const { cartItems, machine, totalPrice } = useAppContext();

  return (
    <div className="screen-wrapper checkout-wrapper flex animate__animated animate__fadeIn">
      <div className="left-screen">
        <h1 className="title">CHECKOUT</h1>
        {cartItems.map((item) => (
          <div key={item.key} className="item">
            <div>
              <p style={{ width: 320 }}>{item.title}</p>
              <h4>
                {item.quantity} x {item.price}$ ={" "}
                {(item.quantity * item.price).toFixed(2)}$
              </h4>
              <p>Size: {item.size}</p>
            </div>
            <img src={item.image} alt={item.title} className="item-image" />
          </div>
        ))}
        <h2 className="total-amount">
          Total: {(totalPrice + 9).toFixed(2)}$ (including delivery)
        </h2>
      </div>

      <div className="right-screen flex column align-items-center">
        <div>
          <h3>Deliver to: Israel</h3>
          <h4> 9$ Standard Delivery</h4>
          <div className="inputs-wrapper flex column">
            <input className="input" placeholder="Home Address" />
            <input className="input" placeholder="Phone Number" />
          </div>
        </div>
        <button
          className="primary-btn"
          onClick={() => machine.transition(EventsEnum.GO_TO_PAYMENT)}
        >
          Continue To Payment
        </button>
      </div>
    </div>
  );
};
