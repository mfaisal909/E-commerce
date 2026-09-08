const initialState = {
  allProducts: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getAllProductsRequest":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "getAllProductsSuccess":
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
        error: null,
      };
    case "getAllProductsFailed":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "getAllProductsShopRequest":
      return {
        ...state,
        loading: true,
      };
    case "getAllProductsShopSuccess":
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };
    case "getAllProductsShopFailed":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
