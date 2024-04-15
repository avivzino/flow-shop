export enum StatesEnum {
  BROWSE = "browse",
  CART = "cart",
  CHECKOUT = "checkout",
  PAYMENT = "payment",
  ORDER_CONFIRMED = "orderConfirmed",
}

export enum EventsEnum {
  VIEW_CART = "viewCart",
  ADD_TO_CART = "addToCart",
  REMOVE_FROM_CART = "removeFromCart",
  GO_TO_CHECKOUT = "goToCheckout",
  GO_TO_PAYMENT = "goToPayment",
  PAYMENT_COMPLETE = "paymentComplete",
  GO_HOME = "goHome",
}

export const transitions = {
  browse: {
    addToCart: "browse",
    viewCart: "cart",
  },
  cart: {
    removeFromCart: "cart",
    goToCheckout: "checkout",
    goHome: "browse",
  },
  checkout: {
    viewCart: "cart",
    goToPayment: "payment",
    goHome: "browse",
  },
  payment: {
    viewCart: "cart",
    paymentComplete: "orderConfirmed",
    goHome: "browse",
  },
  orderConfirmed: {
    viewCart: "cart",
    goHome: "browse",
  },
};
