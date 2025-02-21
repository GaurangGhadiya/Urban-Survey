// actions/someActions.js
import axios from "../api";

import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchDashboardSuccess = (data) => ({
  type: DASHBOARD_REPORT_SUCCESS,
  payload: data,
});

export const fetchDashboardFaliure = (error) => ({
  type: DASHBOARD_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDashboarFilters = (queryParams) => {
  let  url = "/report/survey"
  if(queryParams?.districtId){
    url = url+ `?districtId=${encryptDataGet(JSON.stringify(queryParams?.districtId))}`
  }
  if(queryParams?.municipalId){
    url = url+ `&municipalId=${encryptDataGet(JSON.stringify(queryParams?.municipalId))}`
  }
  if(!queryParams?.districtId && queryParams?.wardId){
    url = url+ `?wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  } else if (queryParams?.wardId) {
     url = url+ `&wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  }
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      let originalText = decryptData(response?.data?.data);
      dispatch(fetchDashboardSuccess(originalText));
    } catch (error) {
      dispatch(fetchDashboardFaliure(error));
    }
  };
};
