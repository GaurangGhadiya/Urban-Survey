// actions/someActions.js
import axios from "../api";

import {
  SUMMARY_REPORT_SUCCESS,
  SUMMARY_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchSummaryReportSuccess = (data) => ({
  type: SUMMARY_REPORT_SUCCESS,
  payload: data,
});

export const fetchSummaryReportFaliure = (error) => ({
  type: SUMMARY_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSummaryReport = (queryParams) => {
  let  url = "/report/survey/summary"
  if(queryParams?.districtId){
    url = url+ `?districtId=${encryptDataGet(JSON.stringify(queryParams?.districtId))}`
  }
  if(queryParams?.municipalId){
    url = url+ `&municipalId=${encryptDataGet(JSON.stringify(queryParams?.municipalId))}`
  }
  if(!queryParams?.districtId && queryParams?.wardId){
    url = url+ `?wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  } else if (queryParams?.wardId){
    url = url+ `&wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  }
  
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      let originalText = decryptData(response?.data?.data);
      dispatch(fetchSummaryReportSuccess(originalText));
    } catch (error) {
      dispatch(fetchSummaryReportFaliure(error));
    }
  };
};
