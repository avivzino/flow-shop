import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FSM } from "../../../FSM";
import { AppContext, AppProvider } from "../../../context";
import { Product } from "./Product";
import { ProductData } from "../../../types/app.types";
import { EventsEnum } from "../../../types/machine.types";

describe("Product Component", () => {
  it("renders product details correctly", () => {
    const product: ProductData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
    };

    render(
      <AppProvider>
        <Product product={product} handleSizeChange={() => {}} />
      </AppProvider>
    );

    expect(screen.getByText("20$")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
    expect(
      screen.getByRole("button", { name: "+ Add To Cart" })
    ).toBeInTheDocument();
  });

  it("calls handleSizeChange with the correct arguments when the size is changed", () => {
    const product: ProductData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
    };

    const handleSizeChange = vi.fn();

    render(
      <AppProvider>
        <Product product={product} handleSizeChange={handleSizeChange} />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText("Size:"), {
      target: { value: "L" },
    });

    expect(handleSizeChange).toHaveBeenCalledWith(1, "L");
  });

  it("calls addProductToCart when the 'Add to Cart' button is clicked", () => {
    const product: ProductData = {
      id: 1,
      title: "Test Product",
      price: 20,
      image: "test-image.jpg",
      size: "M",
    };

    const addProductToCart = vi.fn();

    const mockAppContextValue = {
      machine: new FSM<string, EventsEnum>("initialState", {}),
      cartItems: [],
      addProductToCart,
      handleIncreaseQuantity: vi.fn(),
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
        <Product product={product} handleSizeChange={() => {}} />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Add To Cart" }));

    expect(addProductToCart).toHaveBeenCalledWith(product);
  });
});
