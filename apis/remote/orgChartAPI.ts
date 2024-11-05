import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getOrgChartFromAPI = async (facilityId = null) => {
    console.log("Get organization chart start...");
    console.log("Getting organization chart for the facility of id: " + facilityId);
    let orgChartUrl = `orgCharts?facilityId=${facilityId}`;

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