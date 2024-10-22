import {bearerTokenStore} from "../store/mmkv/bearerTokenStore";
import axios from "axios";
import {errorFormat, successFormat} from "../Helpers/apiHelpers";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const baseUrl = 'https://myapplib.com/api/v1/employees';

// have to set to 25 otherwise there will be bug where many fetchNextPage will occur by reaching the bottom
export const getEmployeesFromAPI = ({page = 1, search = '', perPage = 25}) => {
    const token = bearerTokenStore.getState().token;

    console.log("Fetch employees start...")
    return axios
        .get(baseUrl, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            params: {
                ...(siteToken && {siteToken: siteToken}),
                ...(page && {page: page}),
                ...(perPage && {perPage: perPage}),
                // ...(search && {search: search})      // search will be handled in the app using local db
            }
        })
        .then(response => {
            console.log("Response from server...")
            const formattedData = successFormat(response);

            if (formattedData?.success) return formattedData;

            // fallback response - I am returning new object here instead of utilising the object formattedData returns to handle error in successFormat
            return Promise.reject({
                success: false,
                message: formattedData.message
            });
        })
        .catch(error => {
            console.log("Error from server...")
            const formattedData = errorFormat(error);

            if (!formattedData?.success) return Promise.reject(formattedData);

            // fallback response
            return Promise.reject({
                success: false,
                message: "An error occurred, and no error message was provided."
            });
        })
}