import {bearerTokenStore} from "../store/mmkv/bearerTokenStore";
import axios from "axios";
import {errorFormat, successFormat} from "../Helpers/apiHelpers";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
// const siteToken = '';
const baseUrl = 'https://myapplib.com/api/v1';

export const postLogin = (loginData) => {
    console.log("Login start...")
    const loginUrl = `${baseUrl}/login`;

    console.log("loginData:", loginData);

    return axios
        .post(loginUrl, {
                email: loginData.email,
                password: loginData.password,
                deviceName: loginData.deviceName || 'iOS Emulator',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
                params: {
                    ...(siteToken && {siteToken: siteToken}),
                },
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
        .finally(() => {
            console.log("Login finished...")
        });
}

export const postLogout = () => {
    // This has to be called on function mounting to get the recent token otherwise it will use the previous stored token instead of the current one
    const token = bearerTokenStore.getState().token;
    console.log("Logout start...");
    const logoutUrl = `${baseUrl}/logout`;

    console.log("Header Token:", token);

    return axios
        .post(logoutUrl, null, { // null to correctly format the post request
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
        .finally(() => {
            console.log("Logout finished...")
        })
}

export const getConfirmToken = () => {
    // This has to be called on function mounting to get the recent token otherwise it will use the previous stored token instead of the current one
    const token = bearerTokenStore.getState().token;
    console.log("Token confirmation start...");
    const logoutUrl = `${baseUrl}/validate-token`;

    console.log("Header Token:", token);

    return axios
        .get(logoutUrl, {
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
                message: formattedData.message,
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
        .finally(() => {
            console.log("Confirm token finished...")
        })

}
