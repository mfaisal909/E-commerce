import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};

export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${server}/user/update-user-info`,
      { name, email, phoneNumber, password },
      { withCredentials: true }
    );
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
      message: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Failed to update user",
    });
  }
};

export const updatUserAddress = (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
  try {
    await axios.post(
      `${server}/user/update-user-addresses`,
      { address1, address2, country, city, zipCode, addressType },
      { withCredentials: true }
    );
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Failed to add address",
    });
  }
};

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    await axios.delete(`${server}/user/delete-user-address/${id}`, {
      withCredentials: true,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Failed to delete address",
    });
  }
};
// load seller

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || "Unable to connect to the server",
    });
  }
};
