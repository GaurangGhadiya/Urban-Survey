// actions/someActions.js
import axios from "../api";

import { UPDATE_FAMILY_SUCCESS, UPDATE_FAMILY_FALIURE } from "../action_types";
import { decryptData, decryptDataWithoutParse, encryptDataGet, encryptDataPost } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchUpdateFamilySuccess = (data) => ({
  type: UPDATE_FAMILY_SUCCESS,
  payload: data,
});

export const fetchUpdateFamilyFailure = (error) => ({
  type: UPDATE_FAMILY_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onFamilyUpdate = (familyObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/familyUpdate",
        encryptDataPost(JSON.stringify(familyObject))
      );

      let newResponse = decryptDataWithoutParse(response?.data?.data);
      dispatch(fetchUpdateFamilySuccess(newResponse));
    } catch (error) {
      dispatch(fetchUpdateFamilyFailure(error));
    }
  };
};
