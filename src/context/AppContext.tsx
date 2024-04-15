import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { FSM } from "../FSM";
import { CartItemData, ProductData } from "../types/app.types";
import { EventsEnum, StatesEnum, transitions } from "../types/machine.types";

interface AppContextType {
  machine: FSM<string, EventsEnum>;
  cartItems: CartItemData[];
  addProductToCart: (product: ProductData) => void;
  handleIncreaseQuantity: (productId: string) => void;
  handleDecreaseQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  handleSizeChange: (productId: string, size: string) => void;
  resetCart: () => void;
  totalPrice: number;
  totalQuantity: number;
  showPopup: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
const machine = new FSM<string, EventsEnum>(StatesEnum.BROWSE, transitions);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addProductToCart = (product: ProductData) => {
    setCartItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        const newItem = {
          ...product,
          quantity: 1,
          key: `${product.id}-${product.size}`,
        };
        return [...currentItems, newItem];
      }
    });

    machine.transition(EventsEnum.ADD_TO_CART);

    setShowPopup(true);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    return () => clearTimeout(id);
  }, [cartItems]);

  const handleIncreaseQuantity = (productKey: string) => {
    addProductToCart(cartItems.find((item) => item.key === productKey)!);
  };

  const handleDecreaseQuantity = (productKey: string) => {
    const item = cartItems.find((item) => item.key === productKey)!;
    if (item.quantity > 1) {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.key === productKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleSizeChange = (productKey: string, size: string) => {
    console.log(productKey);
    const currentItem = cartItems.find((item) => item.key === productKey);

    if (!currentItem) return;

    const existingSizeItem = cartItems.find(
      (item) => item.id === currentItem.id && item.size === size
    );

    if (existingSizeItem) {
      setCartItems((currentItems) =>
        currentItems
          .filter((item) => item.key !== productKey)
          .map((item) =>
            item.id === existingSizeItem.id &&
            item.size === existingSizeItem.size
              ? {
                  ...item,
                  quantity: item.quantity + currentItem.quantity,
                  key: `${item.id}-${size}`,
                }
              : item
          )
      );
    } else {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.key === productKey ? { ...item, size, key: productKey } : item
        )
      );
    }
  };

  const removeProductFromCart = (productKey: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.key !== productKey)
    );
    machine.transition(EventsEnum.REMOVE_FROM_CART);
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const value = {
    machine,
    cartItems,
    addProductToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    removeProductFromCart,
    resetCart,
    handleSizeChange,
    totalPrice,
    totalQuantity,
    showPopup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
