import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  shippingAddresses: [],
  billingAddresses: [],
  selectedBillingAddress: "",
  selectedShippingAddress: ""
};

const fetchBillingAddresses = (state, action) => {
  return updateObject(state, {
    billingAddresses: action.billingAddresses,
    selectedBillingAddress: action.selectedBillingAddress,
    loading: false
  });
};

const fetchShippingAddresses = (state, action) => {
  return updateObject(state, {
    shippingAddresses: action.shippingAddresses,
    selectedShippingAddress: action.selectedShippingAddress,
    loading: false
  });
};

const fetchOrder = (state, action) => {
  return updateObject(state, {
    data: action.data,
    loading: false
  });
};

const start = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const selectChange = (state, action) => {
  return updateObject(state, {
    [action.name]: action.value
  });
};

const error = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const success = () => {
  return updateObject(state, {
    success: true,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BILLING_ADD:
      return fetchBillingAddresses(state, action);
    case actionTypes.FETCH_SHIPPING_ADD:
      return fetchShippingAddresses(state, action);
    case actionTypes.FETCH_ORDER:
      return fetchOrder(state, action);
    case actionTypes.SELECT_CHANGE:
      return selectChange(state, action);
    case actionTypes.START:
      return start(state, action);
    case actionTypes.ERROR:
      return error(state, action);
    case actionTypes.PAYMENT_SUCCESS:
      return success(state, action);

    default:
      return state;
  }
};

export default reducer;
