import axios from "../api";

import { VERIFICATION_SUCCESS, VERIFICATION_FALIURE } from "../action_types";
import { decryptData, decryptDataWithoutParse, encryptDataPost } from "../../utils/encryptDecrypt";
export const fetchVerificationSuccess = (data) => ({
  type: VERIFICATION_SUCCESS,
  payload: data,
});

export const fetchVerificationFaliure = (error) => ({
  type: VERIFICATION_FALIURE,
  payload: error,
});

export const onVerification = (
  remarks_id,
  verification_status_id,
  him_parivar_id,
  user_id
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/family/verification/status-update",
        encryptDataPost(
          JSON.stringify({
            remarks_id: remarks_id,
            verification_status_id: verification_status_id,
            him_parivar_id: him_parivar_id,
            user_id: user_id,
          })
        )
      );
      let newResponse = decryptDataWithoutParse(response?.data?.data);
      dispatch(fetchVerificationSuccess(newResponse));
    } catch (error) {
      dispatch(fetchVerificationFaliure(error));
    }
  };
};
