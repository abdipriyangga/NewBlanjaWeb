import actionAuth from "../actions/actionAuth";
import { addAddressCustomerCreator } from "../actions/auth";

const initialState = {
  data: [],
  isLogin: false,
  msgInvalid: "",
  status: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,

  statusAddAddress: null,
  errorAddAddress: undefined,
  isAddAddressPending: false,
  isAddAddressFulFilled: false,
  isAddAddressRejected: false,
};

const auth = (state = initialState, { type, payload }) => {
  // console.log("MESSAGE", payload);
  switch (type) {
    case actionAuth.authLogin + "_PENDING":
      return {
        ...state,
        isPending: true,
      };
    case actionAuth.authLogin + "_REJECTED":
      return {
        ...state,
        isRejected: true,
        isPending: false,
        msgInvalid: payload.response.data.message.msg,
      };
    case actionAuth.authLogin + "_FULFILLED":
      if (payload.data.success === false) {
        return {
          ...state,
          data: [],
          msgInvalid: payload.response.data.message.msg,
          isLogin: false,
        };
      } else {
        console.log("SUCESS", payload.data.message.status);
        return {
          ...state,
          data: payload.data.data,
          msgInvalid: "",
          isLogin: true,
          isFulfilled: true,
          isPending: false,
          isRejected: false,
        };
      }
    case actionAuth.authRegister + "_PENDING":
      return {
        ...state,
        isPending: true,
      };
    case actionAuth.authRegister + "_REJECTED":
      return {
        ...state,
        isRejected: true,
        isPending: false,
      };
    case actionAuth.authRegister + "_FULFILLED":
      console.log("regis", payload.data.data);
      return {
        ...state,
        data: payload.data.data,
        msgInvalid: "",
        isLogin: false,
        isFulfilled: true,
        // isPending: false,
        // isRejected: false,
      };
    case actionAuth.authLogOut:
      return {
        data: [],
        isLogin: false,
        msgInvalid: "",
        isPending: false,
        isFulfilled: false,
        isRejected: false,
        status: {},
      };
      case String(addAddressCustomerCreator.pending):
        return {
          ...state,
          isAddAddressPending: true,
        };
      case String(addAddressCustomerCreator.fulfilled): {
        let status;
        let err;
        if (payload.status === 200) {
          status = 200;
          err = undefined;
        } else {
          status = 500;
          err = payload.error;
        }
        console.log('REDUCERS ADDRESS: ', payload.status)
        return {
          ...state,
          data: { ...state.data, ...payload.data },
          statusAddAddress: status,
          errorAddAddress: undefined,
          isAddAddressPending: false,
          isAddAddressFulFilled: true,
          isAddAddressRejected: false,
        };
      }
      case String(addAddressCustomerCreator.rejected):
        return {
          ...state,
          statusAddAddress: 500,
          errorAddAddress: payload,
          isAddAddressRejected: true,
          isAddAddressPending: false,
          isAddAddressFulFilled: false,
        };
    default:
      return state;
  }
};

export default auth;
