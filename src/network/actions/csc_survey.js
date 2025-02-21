// actions/someActions.js
import axios from "../api";

import { CSC_SURVEY_REPORT_SUCCESS,CSC_SURVEY_REPORT_FAILURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchCSCListSuccess = (data) => ({
  type: CSC_SURVEY_REPORT_SUCCESS,
  payload: data,
});

export const fetchCSCListFailure = (error) => ({
  type: CSC_SURVEY_REPORT_FAILURE,
  payload: error,
});

export const onCSCSurveyList = (queryParams) => {
  let  url = "/report/survey/csc";
  if(queryParams?.page){
    url = url+ `?page=${encryptDataGet(JSON.stringify(queryParams?.page))}`
  }
  if(!queryParams?.page && queryParams?.size){
    url = url+ `?size=${encryptDataGet(JSON.stringify(queryParams?.size))}`
  } else {
    url = url+ `&size=${encryptDataGet(JSON.stringify(queryParams?.size))}`
  }
  if(queryParams?.districtId){
    url = url+ `&districtId=${encryptDataGet(JSON.stringify(queryParams?.districtId))}`
  }
  if(queryParams?.municipalId){
    url = url+ `&municipalId=${encryptDataGet(JSON.stringify(queryParams?.municipalId))}`
  }
  if(queryParams?.wardId){
    url = url+ `&wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  }
  if(queryParams?.userName){
    url = url+ `&userName=${encryptDataGet(JSON.stringify(queryParams?.userName))}`
  }
  if(queryParams?.fromDate){
    url = url+ `&fromDate=${encryptDataGet(queryParams?.fromDate)}`
  }
  if(queryParams?.toDate){
    url = url+ `&toDate=${encryptDataGet(queryParams?.toDate)}`
  }
  
  // if(queryParams?.verificationStatusId){
  //   url = url+ `&verificationStatusId=${encryptDataGet(JSON.stringify(queryParams?.verificationStatusId))}`
  // }
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      let newResponseData = decryptData(response?.data?.data);
      dispatch(fetchCSCListSuccess(newResponseData));
    } catch (error) {
      dispatch(fetchCSCListFailure(error));
    }
  };
};
