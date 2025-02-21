// actions/someActions.js
import axios from "../api";

import { QUALIFICATION_SUCCESS, QUALIFICATION_FALIURE } from "../action_types";
import { decryptData } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchQualificationSuccess = (data) => ({
  type: QUALIFICATION_SUCCESS,
  payload: data,
});

export const fetchQualificationFailure = (error) => ({
  type: QUALIFICATION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onQualificationsList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getQualifications`, {});
      let newResponse = decryptData(response?.data?.data);
      dispatch(fetchQualificationSuccess(newResponse));
    } catch (error) {
      dispatch(fetchQualificationFailure(error));
    }
  };
};
