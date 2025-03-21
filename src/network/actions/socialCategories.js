// actions/someActions.js
import axios from "../api";

import { SOCIAL_CAT_SUCCESS, SOCIAL_CAT_FALIURE } from "../action_types";
import { decryptData } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchSocialCatSuccess = (data) => ({
  type: SOCIAL_CAT_SUCCESS,
  payload: data,
});

export const fetchSocialCatFailure = (error) => ({
  type: SOCIAL_CAT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSocialCatList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getSocialCategories`, {});
      let newResponse = decryptData(response?.data?.data);
      dispatch(fetchSocialCatSuccess(newResponse));
    } catch (error) {
      dispatch(fetchSocialCatFailure(error));
    }
  };
};
