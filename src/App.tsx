import { useEffect, useState } from "react";
import "animate.css";
import { useAppContext } from "./context";
import { Cart, Checkout, Header, Home, Payment, ThankYou } from "./components";
import { StatesEnum } from "./types/machine.types";
import "./common/style.css";
import "./App.css";

export const App = () => {
  const { machine } = useAppContext();

  const [appState, setAppState] = useState<StatesEnum>(
    machine.getState() as StatesEnum
  );

  useEffect(() => {
    const listener = () => {
      setAppState(machine.getState() as StatesEnum);
    };
    machine.addListener(listener);
    return () => machine.removeListener(listener);
  }, []);

  const renderScreen = () => {
    switch (appState) {
      case StatesEnum.BROWSE:
        return <Home />;
      case StatesEnum.CART:
        return <Cart />;
      case StatesEnum.CHECKOUT:
        return <Checkout />;
      case StatesEnum.PAYMENT:
        return <Payment />;
      case StatesEnum.ORDER_CONFIRMED:
        return <ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className="app flex column">
      <Header />
      {renderScreen()}
    </div>
  );
};
