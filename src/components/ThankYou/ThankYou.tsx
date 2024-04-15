import { useEffect } from "react";
import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./ThankYou.css";

export const ThankYou = () => {
  const { machine, resetCart } = useAppContext();

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <div className="thank-you-wrapper flex column align-items-center justify-content-center calculated-height">
      <h1 className="thank-you-title animate__animated animate__fadeInDown">
        Thank You For Your Order!
      </h1>
      <p className="thank-you-text">Your order has been successfully placed.</p>
      <button
        className="primary-btn"
        onClick={() => machine.transition(EventsEnum.GO_HOME)}
      >
        Back to Home
      </button>
    </div>
  );
};
