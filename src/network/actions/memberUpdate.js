// actions/someActions.js
import axios from "../api";

import { UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FALIURE } from "../action_types";
import { decryptData, decryptDataWithoutParse, encryptDataPost } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchUpdateMemberSuccess = (data) => ({
  type: UPDATE_MEMBER_SUCCESS,
  payload: data,
});

export const fetchUpdateMemberFailure = (error) => ({
  type: UPDATE_MEMBER_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onMemberUpdate = (memberObject) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/family/member/updateData",
        encryptDataPost(JSON.stringify(memberObject))
      );
      let newResponse = decryptDataWithoutParse(response?.data?.data);
      dispatch(fetchUpdateMemberSuccess(newResponse));
    } catch (error) {
      dispatch(fetchUpdateMemberFailure(error));
    }
  };
};
