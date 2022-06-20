import { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "../reducer/cartReducer";
import Users from "../services/userServices";
import { AuthContext } from "../context/AuthContext";
import Toast from "../components/Toast";
import { LOCAL_STORAGE_CART_KEY } from "../constant/constant";
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext();

const initialCart = {
  cart: [],
  total: 0,
  amount: 0,
  cartIdChecked: [],
  totalCart: 0,
};

const CartProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [cartState, dispatch] = useReducer(cartReducer, initialCart, () => {
    const localStorageItem = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    return localStorageItem ? JSON.parse(localStorageItem) : initialCart;
  });

  const getCart = () => {
    if (auth.token) {
      Users.getUserById(auth.data._id)
        .then((data) => {
          dispatch({
            type: "GET_CART",
            payload: data?.result?.carts.map((item) => {
              return { ...item, id: item._id };
            }),
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      dispatch({
        type: "GET_CART",
        payload: cartState.cart,
      });
    }
  };
  useEffect(() => {
    getCart();
  }, [auth]);

  const totalCart = (idArr) => {
    dispatch({ type: "TOTAL_PRICE_CART", payload: idArr });
  };
  useEffect(() => {
    dispatch({ type: "CHANGE_AMOUNT" });
    dispatch({ type: "TOTAL_PRICE" });
    if (!auth.token) {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));
    }
  }, [cartState.cart]);

  const setCart = (cart) => {
    dispatch({ type: "SET_CART", payload: cart });
  };

  const addToCart = async (item) => {
    try {
      if (auth.token) {
        const data = await Users.addToCart(auth.data._id, item);
        if (data.data) {
          dispatch({
            type: "ADD_TO_CART_SUCCESS",
            payload: { ...data.data },
          });
        }
      } else {
        dispatch({
          type: "ADD_TO_CART_SUCCESS",
          payload: { ...item, _id: uuidv4() },
        });
      }
      Toast("success", "Thêm vào giỏ hàng thành công");
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const removeFromCart = async (id, toast) => {
    try {
      if (auth.token) {
        await Users.removeFromCart(auth.data._id, { cart_id: id });
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
        if (toast !== "noToast")
          Toast("success", "Xóa khỏi giỏ hàng thành công");
      } else {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
        if (toast !== "noToast")
          Toast("success", "Xóa khỏi giỏ hàng thành công");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const increaseQuantity = async (id, number) => {
    try {
      if (auth.token) {
        await Users.updateCart(id, { product_quantity: number });
        dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
      } else {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));
        dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const decreaseQuantity = async (id, number) => {
    try {
      if (auth.token) {
        if (number > 0) {
          await Users.updateCart(id, { product_quantity: number });
        } else {
          await Users.removeFromCart(auth.data._id, { cart_id: id });
        }
        dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
      } else {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));
        dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const logOut = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalCart,
        logOut,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
