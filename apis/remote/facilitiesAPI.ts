import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getFacilitiesFromAPI = async ({pageParam = 1, perPage = 25, searchQuery = ''}) => {
    console.log("Get facilities list start...");
    console.log(`Fetching facilities for page ${pageParam}...`);
    let facilitiesUrl = `/facilities`;

    if (pageParam) {
        facilitiesUrl = facilitiesUrl?.includes('?')
            ? `${facilitiesUrl}&page=${pageParam}`
            : `${facilitiesUrl}?page=${pageParam}`;
    }

    if (perPage) {
        facilitiesUrl = facilitiesUrl?.includes('?')
            ? `${facilitiesUrl}&perPage=${perPage}`
            : `${facilitiesUrl}?perPage=${perPage}`;
    }

    if (searchQuery) {
        facilitiesUrl = facilitiesUrl?.includes('?')
            ? `${facilitiesUrl}&search=${searchQuery}`
            : `${facilitiesUrl}?search=${searchQuery}`;
    }

    // console.log(`Employees url: ${facilitiesUrl}`);

    return getRequest(facilitiesUrl)
        .then((response) => {
            // console.log("Success at getEmployeesFromAPI: ", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error at getEmployeesFromAPI: ", error);
            return Promise.reject(error);
        })
        .finally(() => {
            console.log("Get facilities list finished...");
        });
}