// actions/someActions.js
import axios from "../api";

import { CSCUSER_SUCCESS, CSCUSER_FAILURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchCSCUserSuccess = (data) => ({
  type: CSCUSER_SUCCESS,
  payload: data,
});

export const fetchCSCUserFailure = (error) => ({
  type: CSCUSER_FAILURE,
  payload: error,
});

// Async Action to Fetch Data
export const onCSCUserListSurveyor = (districtid, ward_id, municipalid) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/user/getCSCUsers?districtCode=${districtid?.code?encryptDataGet(JSON.stringify(districtid?.code)):""}&wardId=${ward_id?encryptDataGet(JSON.stringify(ward_id)):""}&municipalId=${municipalid?.value?encryptDataGet(JSON.stringify(municipalid?.value)):""}`, {});
      let orignalResponse = decryptData(response?.data?.data);
      dispatch(fetchCSCUserSuccess(orignalResponse));
    } catch (error) {
      dispatch(fetchCSCUserFailure(error));
    }
  };
};
