import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getOrgChartFromAPI = async (facilityId = null, refreshCache = false) => {
    console.log("Get organization chart start...");
    if (facilityId) {
        console.log("Getting organization chart for the facility of id: " + facilityId);
    }
    console.log("Getting organization chart of the company with facility only.")
    let orgChartUrl = 'orgCharts';

    if (facilityId) {
        orgChartUrl = orgChartUrl + `/${facilityId}`;
    }

    if (refreshCache) {
        orgChartUrl = orgChartUrl?.includes('?')
            ? `${orgChartUrl}&refreshCache=${refreshCache}`
            : `${orgChartUrl}?refreshCache=${refreshCache}`;
    }

    // console.log("New url:", orgChartUrl);

    return getRequest(orgChartUrl)
        .then((response) => {
            // console.log("Success at orgChartFromAPI: ", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error at orgChartFromAPI: ", error);
            return Promise.reject(error);
        })
        .finally(() => {
            console.log("Get organization chart finished...");
        });


}