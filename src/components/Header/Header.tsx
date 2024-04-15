import { useAppContext } from "../../context";
import { EventsEnum } from "../../types/machine.types";
import "./Header.css";

export const Header = () => {
  const { machine, totalQuantity } = useAppContext();

  return (
    <div className="header flex align-items-center justify-content-space-between">
      <img
        src="flow-shop/assets/logo.png"
        className="animate__animated animate__bounceInLeft cursor-pointer"
        width={140}
        onClick={() => machine.transition(EventsEnum.GO_HOME)}
        alt="Logo"
      />
      <div
        className="cart flex align-items-center cursor-pointer animate__animated animate__fadeIn"
        onClick={() => machine.transition(EventsEnum.VIEW_CART)}
      >
        <img src="flow-shop/assets/cart.png" width={35} alt="Cart" />
        <h4>{totalQuantity}</h4>
      </div>
    </div>
  );
};
