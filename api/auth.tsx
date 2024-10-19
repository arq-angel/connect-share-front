import {bearerTokenStore} from "../store/bearerTokenStore";
import axios from "axios";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
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
            const responseData = response.data;
            console.log("Response:", responseData);

            // Check if response data contains success and token
            if (responseData?.success && responseData?.data?.token && responseData?.data?.expiresAt) {
                return {
                    success: true,
                    message: responseData.data.message,
                    token: responseData.data.token,
                    expiresAt: responseData.data.expiresAt,
                }
            }

            // Handle unexpected success response structure
            return Promise.reject('Unexpected response from server.');
        })
        .catch(error => {
            console.log("Axios Error:", error);
            console.log("Error:", error.response.data);

            // Set default error message
            let errorMessage = 'An unexpected error occurred.';

            // Check for specific error response
            if (error.response) {
                const responseData = error.response.data;

                // return the error promise no matter what error we get either validation, authentication or network error
                if (responseData.errors || responseData.message) {
                    errorMessage = 'Invalid credentials. Please try again.';
                }
            } else {
                // If there's no response from the server
                errorMessage = 'Network error. Please check your connection.';
            }

            return Promise.reject(errorMessage);
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
            const responseData = response.data;
            console.log("Response:", responseData)

            if (responseData?.success && responseData?.message) {
                console.log("Success:", responseData.message);

                return {
                    success: true,
                    message: responseData.message,
                }
            }

            return Promise.reject('Unexpected response from serve.');

        })
        .catch(error => {
            console.log("Axios Error:", error);
            console.log("Error:", error.response.data);

            // Set default error message
            let errorMessage = 'An unexpected error occurred.';

            // Check for specific error response
            if (error.response) {
                const responseData = error.response.data;

                // return the error promise no matter what error we get either validation, authentication or network error
                if (responseData.message == 'Unauthenticated.') {
                    errorMessage = 'Token Expired.';
                }
            } else {
                // If there's no response from the server
                errorMessage = 'Network error. Please check your connection.';
            }

            return Promise.reject(errorMessage);

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
            const responseData = response.data;
            console.log("Response:", responseData)

            if (responseData?.success && responseData?.message) {
                console.log("Success:", responseData.message);

                return {
                    success: true,
                    message: responseData.message,
                }
            }

            return Promise.reject('Unexpected response from serve.');

        })
        .catch(error => {
            console.log("Axios Error:", error);
            console.log("Error:", error.response.data);

            // Set default error message
            let errorMessage = 'An unexpected error occurred.';

            // Check for specific error response
            if (error.response) {
                const responseData = error.response.data;

                // return the error promise no matter what error we get either validation, authentication or network error
                if (responseData.message == 'Unauthenticated.') {
                    errorMessage = 'Token Expired.';
                }
            } else {
                // If there's no response from the server
                errorMessage = 'Network error. Please check your connection.';
            }

            return Promise.reject(errorMessage);

        })
        .finally(() => {
            console.log("Confirm token finished...")
        })

}
