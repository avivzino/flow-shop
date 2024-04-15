import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartItem } from "./CartItem";
import { CartItemData } from "../../../types/app.types";
import { AppContext, AppProvider } from "../../../context";
import { EventsEnum } from "../../../types/machine.types";
import { FSM } from "../../../FSM";

describe("CartItem Component", () => {
  it("renders cart item details correctly", () => {
    const item: CartItemData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
      quantity: 1,
      key: "1-M",
    };

    render(
      <AppProvider>
        <CartItem item={item} />
      </AppProvider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
    expect(screen.getByDisplayValue("M")).toBeInTheDocument();
  });

  it("calls handleSizeChange with the correct arguments when the size is changed", () => {
    const item: CartItemData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
      quantity: 1,
      key: "1-M",
    };

    const handleSizeChange = vi.fn();

    const mockAppContextValue = {
      machine: new FSM<string, EventsEnum>("initialState", {}),
      cartItems: [],
      addProductToCart: vi.fn(),
      handleIncreaseQuantity: vi.fn(),
      handleDecreaseQuantity: vi.fn(),
      removeProductFromCart: vi.fn(),
      handleSizeChange,
      resetCart: vi.fn(),
      totalPrice: 0,
      totalQuantity: 0,
      showPopup: false,
    };

    render(
      <AppContext.Provider value={mockAppContextValue}>
        <CartItem item={item} />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Size:"), {
      target: { value: "L" },
    });

    expect(handleSizeChange).toHaveBeenCalledWith("1-M", "L");
  });

  it("calls handleIncreaseQuantity when the '+' button is clicked", () => {
    const item: CartItemData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
      quantity: 1,
      key: "1-M",
    };

    const handleIncreaseQuantity = vi.fn();

    const mockAppContextValue = {
      machine: new FSM<string, EventsEnum>("initialState", {}),
      cartItems: [],
      addProductToCart: vi.fn(),
      handleIncreaseQuantity,
      handleDecreaseQuantity: vi.fn(),
      removeProductFromCart: vi.fn(),
      handleSizeChange: vi.fn(),
      resetCart: vi.fn(),
      totalPrice: 0,
      totalQuantity: 0,
      showPopup: false,
    };

    render(
      <AppContext.Provider value={mockAppContextValue}>
        <CartItem item={item} />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("+"));

    expect(handleIncreaseQuantity).toHaveBeenCalledWith("1-M");
  });

  it("calls handleDecreaseQuantity when the '-' button is clicked", () => {
    const item: CartItemData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
      quantity: 2,
      key: "1-M",
    };

    const handleDecreaseQuantity = vi.fn();

    const mockAppContextValue = {
      machine: new FSM<string, EventsEnum>("initialState", {}),
      cartItems: [],
      addProductToCart: vi.fn(),
      handleIncreaseQuantity: vi.fn(),
      handleDecreaseQuantity,
      removeProductFromCart: vi.fn(),
      handleSizeChange: vi.fn(),
      resetCart: vi.fn(),
      totalPrice: 0,
      totalQuantity: 0,
      showPopup: false,
    };

    render(
      <AppContext.Provider value={mockAppContextValue}>
        <CartItem item={item} />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("-"));

    expect(handleDecreaseQuantity).toHaveBeenCalledWith("1-M");
  });

  it("calls removeProductFromCart when the 'X' button is clicked", () => {
    const item: CartItemData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
      quantity: 1,
      key: "1-M",
    };

    const removeProductFromCart = vi.fn();

    const mockAppContextValue = {
      machine: new FSM<string, EventsEnum>("initialState", {}),
      cartItems: [],
      addProductToCart: vi.fn(),
      handleIncreaseQuantity: vi.fn(),
      handleDecreaseQuantity: vi.fn(),
      removeProductFromCart,
      handleSizeChange: vi.fn(),
      resetCart: vi.fn(),
      totalPrice: 0,
      totalQuantity: 0,
      showPopup: false,
    };

    render(
      <AppContext.Provider value={mockAppContextValue}>
        <CartItem item={item} />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("X"));

    expect(removeProductFromCart).toHaveBeenCalledWith("1-M");
  });
});
