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
export const onSummaryReportDownload = (wardId, municipalId, districtId) => {
  return async (dispatch) => {
    try {

      let url = "/download/excel/survey/summary"
      if(districtId){
        url = url+ `?districtId=${encryptDataGet(JSON.stringify(districtId))}`
      }
      if(municipalId){
        url = url+ `&municipalId=${encryptDataGet(JSON.stringify(municipalId))}`
      }
      if(!districtId && wardId){
        url = url+ `?wardId=${encryptDataGet(JSON.stringify(wardId))}`
      } else if(wardId){
        url = url+ `&wardId=${encryptDataGet(JSON.stringify(wardId))}`
      }

      // let param=``;

      // if(districtId>0){
      //   param+=`districtId=${districtId}`;
      // }
      // if(muncipalId>0){
      //   param+=`&municipalId=${muncipalId}`;
      // }
     
      // if(wardId>0){
      //   param+=`&wardId=${wardId}`;
      // }  

      const response = await axios.get(url, {
          responseType: 'blob',
        });
      // const response = await axios.get(`/download/excel/survey/summary?${param}`, {
      //   responseType: 'blob',
      // });

      const urlLink = window.URL.createObjectURL(new Blob([response.data])); // Create a temporary URL for the blob

      // Create a link element
      const link = document.createElement("a");
      link.href = urlLink;
      link.setAttribute(
          "download",
          `SummaryReport.csv`
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
