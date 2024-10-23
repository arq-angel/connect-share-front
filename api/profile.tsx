import {bearerTokenStore} from "../store/mmkv/bearerTokenStore";
import axios from "axios";
import {errorFormat, successFormat} from "../Helpers/apiHelpers";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const baseUrl = 'https://myapplib.com/api/v1/profile';
const token = bearerTokenStore.getState().token;

// have to set to 25 otherwise there will be bug where many fetchNextPage will occur by reaching the bottom
export const getProfileFromAPI = () => {
    console.log("Fetch employee profile start...")
    return axios
        .get(baseUrl, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            params: {
                ...(siteToken && {siteToken: siteToken}),
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

export const updateProfileFromAPI = (data) => {
    const newUrl = baseUrl + '/1'; // here 1 is an arbitrary value just to access the update method the user id is retrieved using bearer token
    console.log("Update profile start...")
    return axios
        .patch(newUrl, {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            // image: data.image ?? null,
            image:  null,   // handle image update in the future
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            address: data.address,
            suburb: data.suburb,
            state: data.state,
            postCode: data.postCode,
            country: "Australia"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            params: {
                ...(siteToken && {siteToken: siteToken}),
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