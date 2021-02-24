import { authLogin, authRegister, addAddressCustomer } from "../../utility/Auth";
import actionAuth from "./actionAuth";
import { createAsyncAction } from "redux-promise-middleware-actions";

export const authLoginCreator = (email, password) => {
  return {
    type: actionAuth.authLogin,
    payload: authLogin(email, password),
  };
};

export const authRegisterCreator = (data) => {
  return {
    type: actionAuth.authRegister,
    payload: authRegister(data),
  };
};

export const authLogOutCreator = () => {
  return {
    type: actionAuth.authLogOut,
  };
};

export const addAddressCustomerCreator = createAsyncAction(
  "ADDADDRESS",
  async (id_address, body) => {
    const res = await addAddressCustomer(id_address, body);
    return res.data;
  }
);
