import { useState } from "react";
import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./Payment.css";

export const Payment = () => {
  const { machine, totalPrice } = useAppContext();
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [formValid, setFormValid] = useState(true);

  const handlePayment = () => {
    if (validateForm()) {
      setIsProcessing(true);
      setTimeout(() => {
        machine.transition(EventsEnum.PAYMENT_COMPLETE);
      }, 1500);
    } else {
      setFormValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cardNumber" || name === "cvv") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    setCreditCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormValid(true);
  };

  const validateForm = () =>
    Object.values(creditCard).every((val) => val.trim() !== "");

  return (
    <div className="flex justify-content-center align-items-center calculated-height animate__animated animate__fadeIn">
      <div className="payment-form">
        <h1 className="payment-title">Payment Details</h1>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={creditCard.cardNumber}
          onChange={handleChange}
          placeholder="Enter card number"
          className="input-field"
        />
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={creditCard.expiryDate}
          onChange={handleChange}
          placeholder="MM/YY"
          className="input-field"
        />
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={creditCard.cvv}
          onChange={handleChange}
          placeholder="CVV"
          className="input-field"
        />
        <input
          type="text"
          id="nameOnCard"
          name="nameOnCard"
          value={creditCard.nameOnCard}
          onChange={handleChange}
          placeholder="Name on card"
          className="input-field"
        />
        <h3>Total: ${(totalPrice + 9).toFixed(2)}</h3>
        {!formValid && <p className="error">Please fill in all fields</p>}{" "}
        {isProcessing ? (
          <div className="loader"></div>
        ) : (
          <button onClick={handlePayment} className="pay-btn">
            Process Payment
          </button>
        )}
      </div>
    </div>
  );
};
