import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETIALS_SUCCESS,
  PRODUCT_DETIALS_FAIL,
  PRODUCT_DETIALS_REQUEST,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDetialsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DETIALS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETIALS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETIALS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
