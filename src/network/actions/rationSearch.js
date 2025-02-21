// actions/someActions.js
import axios from "../api";

import { RATION_SUCCESS, RATION_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchRationDetailSuccess = (data) => ({
  type: RATION_SUCCESS,
  payload: data,
});

export const fetchRationDetailFailure = (error) => ({
  type: RATION_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onRationDetails = (rationNumber) => {
  return async (dispatch) => {
    let url = "/fetch-ration-details";
    if(rationNumber){
      url = url+ `?rationCardNo=${encryptDataGet(rationNumber)}`
    } 

    try {
      // let params = { rationCardNo: encryptDataGet(rationNumber) };
      // const response = await axios.get(`/fetch-ration-details`, {
      //   params: params
      // });
      let response = await axios.get(url);
      let newResponse = decryptData(response?.data?.data);
      dispatch(fetchRationDetailSuccess(newResponse));
    } catch (error) {
      dispatch(fetchRationDetailFailure(error));
    }
  };
};
