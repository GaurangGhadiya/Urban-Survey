// actions/someActions.js
import axios from "../api";

import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchFamiliesListSuccess = (data) => ({
  type: FAMILIES_LIST_SUCCESS,
  payload: data,
});

export const fetchFamiliesListFailure = (error) => ({
  type: FAMILIES_LIST_FALIURE,
  payload: error,
});

export const onFamiliesList = (queryParams) => {
  let  url = "/familyList";
  if(queryParams?.page){
    url = url+ `?page=${encryptDataGet(JSON.stringify(queryParams?.page))}`
  }
  if(!queryParams?.page && queryParams?.size){
    url = url+ `?size=${encryptDataGet(JSON.stringify(queryParams?.size))}`
  } else {
    url = url+ `&size=${encryptDataGet(JSON.stringify(queryParams?.size))}`
  }
  if(queryParams?.districtCode){
    url = url+ `&districtCode=${encryptDataGet(JSON.stringify(queryParams?.districtCode))}`
  }
  if(queryParams?.municipalId){
    url = url+ `&municipalId=${encryptDataGet(JSON.stringify(queryParams?.municipalId))}`
  }
  if(queryParams?.wardId){
    url = url+ `&wardId=${encryptDataGet(JSON.stringify(queryParams?.wardId))}`
  }
  if(queryParams?.verificationStatusId){
    url = url+ `&verificationStatusId=${encryptDataGet(JSON.stringify(queryParams?.verificationStatusId))}`
  }

  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      let originalText = decryptData(response?.data?.data)
      dispatch(fetchFamiliesListSuccess(originalText));
    } catch (error) {
      dispatch(fetchFamiliesListFailure(error));
    }
  };
};
