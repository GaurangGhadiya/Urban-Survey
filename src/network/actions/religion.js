// actions/someActions.js
import axios from "../api";

import { RELIGION_SUCCESS, RELIGION_FALIURE } from "../action_types";
import { decryptData } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchReligionSuccess = (data) => ({
  type: RELIGION_SUCCESS,
  payload: data,
});

export const fetchReligionFailure = (error) => ({
  type: RELIGION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onReligionList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getReligions`, {});
      let newResponse = decryptData(response?.data?.data);
      dispatch(fetchReligionSuccess(newResponse));
    } catch (error) {
      dispatch(fetchReligionFailure(error));
    }
  };
};
