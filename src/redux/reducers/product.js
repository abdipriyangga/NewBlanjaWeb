import * as actions from "../actions/actionTypes";

const initialState = {
  carts: [],
  checkout: {
    transaction_code: "",
    id_address: "",
    seller_id: "",
    item: [],
  },
};

const cartReducer = (state = initialState, { type, payload }) => {
  let newCart = [...state.carts];
  switch (type) {
    case actions.ADD_TO_CART:
      return {
        ...state,
        carts: [...state.carts, payload],
      };
    case actions.CLEAR_CART:
      return {
        ...state,
        carts: [],
      };
    case actions.DELETE_FROM_CART:
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== payload.id),
      };
    case actions.ADD_TO_CHECKOUT:
      return {
        ...state,
        checkout: {
          transaction_code: payload.transaction_code,
          id_address: payload.id_address,
          seller_id: payload.seller_id,
          item: payload.item,
        },
      };
    case actions.CLEAR_CHECKOUT:
      return {
        ...state,
        transaction_code: "",
        id_address: "",
        seller_id: "",
        item: [],
      };
    case actions.QUANTITY_INCREASED:
      const indexQtyInc = state.carts.findIndex((item) => {
        return payload.id === item.id;
      });
      newCart[indexQtyInc] = {
        ...newCart[indexQtyInc],
        qty: state.carts[indexQtyInc].qty + 1,
      };
      return {
        ...state,
        carts: newCart,
      };
    case actions.QUANTITY_DECREASED:
      const indexQtyDec = state.carts.findIndex((item) => {
        return payload.id === item.id;
      });
      newCart[indexQtyDec] = {
        ...newCart[indexQtyDec],
        qty: state.carts[indexQtyDec].qty - 1,
      };
      if (newCart[indexQtyDec].qty === 0) {
        state.carts.splice(indexQtyDec, 1);
        return {
          ...state,
          carts: state.carts,
        };
      } else {
        return {
          ...state,
          carts: newCart,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
