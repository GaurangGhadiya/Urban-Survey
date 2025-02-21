// actions/someActions.js
import axios from "../api";

import { CSC_REPORT_DOWNLOAD_SUCCESS, CSC_REPORT_DOWNLOAD_FALIURE } from "../action_types";
import { encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchDownloadSuccess = (data) => ({
  type: CSC_REPORT_DOWNLOAD_SUCCESS,
  payload: data,
});

export const fetchDownloadFailure = (error) => ({
  type: CSC_REPORT_DOWNLOAD_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onCscReportDownload = (wardId, muncipalId, districtId, userName, toDate, fromDate) => {
  return async (dispatch) => {
    try {

      let  url = "/download/excel/csc-survey/summary";
      if(districtId){
        url = url+ `?districtId=${encryptDataGet(JSON.stringify(districtId))}`
      }
      if(muncipalId){
        url = url+ `&municipalId=${encryptDataGet(JSON.stringify(muncipalId))}`
      }
      if(wardId){
        url = url+ `&wardId=${encryptDataGet(JSON.stringify(wardId))}`
      }
      if(userName){
        url = url+ `&userName=${encryptDataGet(JSON.stringify(userName))}`
      }
      if(!districtId && fromDate){
        url = url+ `?fromDate=${encryptDataGet(fromDate)}`
      } else if(fromDate) {
         url = url+ `&fromDate=${encryptDataGet(fromDate)}`
      }
      if(!districtId && !fromDate && toDate){
        url = url+ `?toDate=${encryptDataGet(toDate)}`
      } else if (toDate) {
        url = url+ `&toDate=${encryptDataGet(toDate)}`
      }

      const response = await axios.get(url, {
        responseType: 'blob',
      });

      const urlNew = window.URL.createObjectURL(new Blob([response.data])); // Create a temporary URL for the blob

      // Create a link element
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const filename = `ReportDetails_${formattedDate}.csv`;

      const link = document.createElement("a");
      link.href = urlNew;
      link.setAttribute(
          "download",
          filename
      ); // Set the filename for the download

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      dispatch(fetchDownloadSuccess(response.data));
    } catch (error) {
      dispatch(fetchDownloadFailure(error));
    }
  };
};
