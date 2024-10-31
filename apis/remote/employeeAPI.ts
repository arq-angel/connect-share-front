import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getEmployeesFromAPI = async ({pageParam = 1}) => {
    console.log("Get employees list start...");
    console.log(`Fetching employees for page ${pageParam}...`);
    const employeesUrl = `/employees?page=${pageParam}`;

    return getRequest(employeesUrl)
        .then((response) => {
            // console.log("Success at getEmployeesFromAPI: ", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error at getEmployeesFromAPI: ", error);
            return Promise.reject(error);
        })
        .finally(() => {
            console.log("Get employees list finished...");
        });
}