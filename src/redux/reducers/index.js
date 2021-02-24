import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./product";

const indexReducer = combineReducers({
  auth: authReducer,
  product: cartReducer,
});

export default indexReducer;
