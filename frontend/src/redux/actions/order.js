import axios from "axios";
import { server } from "../../server";

export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  dispatch({ type: "OrderRequest" });

  try {
    const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "OrderSuccess",
      payload: data.orders || [],
    });
  } catch (error) {
    dispatch({
      type: "OrderFail",
      payload: error.response?.data?.message || "Failed to load orders",
    });
  }
};
