export const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        cart: action.payload,
      };
    case "ADD_TO_CART_SUCCESS":
      if (
        state.cart.find(
          (item) =>
            item.product_code === action.payload.product_code &&
            item.product_size === action.payload.product_size &&
            item.product_color === action.payload.product_color
        )
      ) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                product_quantity:
                  item.product_quantity + action.payload.product_quantity,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          total: state.cart.reduce(
            (total, item) => total + item.product_quantity * item.product_price,
            0
          ),
          amount: state.cart.length,
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        total: state.cart.reduce(
          (total, item) => total + item.product_quantity * item.product_price,
          0
        ),
        amount: state.amount - 1,
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              product_quantity: item.product_quantity + 1,
            };
          }
          return item;
        }),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                product_quantity: item.product_quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.product_quantity > 0),
      };
    case "TOTAL_PRICE_AMOUNT":
      return {
        ...state,
        total: state.cart.reduce(
          (total, item) => total + item.product_quantity * item.product_price,
          0
        ),
        amount: state.cart.length,
      };
    default:
      return state;
  }
};
