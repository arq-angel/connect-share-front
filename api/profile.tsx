import {bearerTokenStore} from "../store/bearerTokenStore";
import axios from "axios";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const baseUrl = 'https://myapplib.com/api/v1/profile';

// have to set to 25 otherwise there will be bug where many fetchNextPage will occur by reaching the bottom
export const getProfile = () => {
    const token = bearerTokenStore.getState().token;
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
            if (response.data && response.data.success) {
                console.log("Success:", response.data.message);
                return {
                    data: response.data.data,  // Employee data
                };
            } else {
                const message = response.data?.message || 'An unknown error occurred';
                console.error("API Error:", message);
                return Promise.reject(new Error(message));
            }
        })
        .catch(error => {
            if (error.response) {
                const message = error.response.data?.message || 'An error occurred on the server';
                console.error("Server Error:", message);
                return Promise.reject(new Error(error.message));
            } else if (error.request) {
                console.error("Network Error: No response received from the server.");
                return Promise.reject(new Error("Network Error: No response received from the server."));
            } else {
                console.error("Request Error:", error.message);
                return Promise.reject(new Error(error.message));
            }
        })
        .finally(() => {
            console.log("Fetch employee profile finished");
        })
}

export const updateProfile = (data) => {
    const token = bearerTokenStore.getState().token;
    const newUrl = baseUrl + '/1'; // here 1 is an arbitrary value just to access the update method the user id is retrieved using bearer token
    console.log("Update profile start...")
    return axios
        .patch(newUrl, {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            image: data.image ?? null,
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
            if (response.data && response.data.success) {
                console.log("Success:", response.data.message);
                return {
                    data: response.data.data,  // Employee data
                };
            } else {
                const message = response.data?.message || 'An unknown error occurred';
                console.error("API Error:", message);
                return Promise.reject(new Error(message));
            }
        })
        .catch(error => {
            if (error.response) {
                const message = error.response.data?.message || 'An error occurred on the server';
                console.error("Server Error:", message);
                return Promise.reject(new Error(error.message));
            } else if (error.request) {
                console.error("Network Error: No response received from the server.");
                return Promise.reject(new Error("Network Error: No response received from the server."));
            } else {
                console.error("Request Error:", error.message);
                return Promise.reject(new Error(error.message));
            }
        })
        .finally(() => {
            console.log("Update profile finished");
        })
}