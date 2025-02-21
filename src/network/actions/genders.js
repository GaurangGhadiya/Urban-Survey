// actions/someActions.js
import axios from "../api";

import { GENDER_SUCCESS, GENDER_FALIURE } from "../action_types";
import { decryptData } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchGenderSuccess = (data) => ({
  type: GENDER_SUCCESS,
  payload: data,
});

export const fetchGenderFailure = (error) => ({
  type: GENDER_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onGenderList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getGender`, {});
      let newResponse = decryptData(response?.data?.data);
      dispatch(fetchGenderSuccess(newResponse));
    } catch (error) {
      dispatch(fetchGenderFailure(error));
    }
  };
};
