import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getEmployeesFromAPI = async ({pageParam = 1, perPage = 25, searchQuery = ''}) => {
    console.log("Get employees list start...");
    console.log(`Fetching employees for page ${pageParam}...`);
    let employeesUrl = `/employees`;

    if (pageParam) {
        employeesUrl = employeesUrl?.includes('?')
            ? `${employeesUrl}&page=${pageParam}`
            : `${employeesUrl}?page=${pageParam}`;
    }

    if (perPage) {
        employeesUrl = employeesUrl?.includes('?')
            ? `${employeesUrl}&perPage=${perPage}`
            : `${employeesUrl}?perPage=${perPage}`;
    }

    if (searchQuery) {
        employeesUrl = employeesUrl?.includes('?')
            ? `${employeesUrl}&search=${searchQuery}`
            : `${employeesUrl}?search=${searchQuery}`;
    }

    // console.log(`Employees url: ${employeesUrl}`);

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