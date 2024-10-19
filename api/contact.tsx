import {bearerTokenStore} from "../store/bearerTokenStore";
import axios from "axios";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const baseUrl = 'https://myapplib.com/api/v1/employees';

// have to set to 25 otherwise there will be bug where many fetchNextPage will occur by reaching the bottom
export const getContacts = ({page = 1, search = '', perPage = 25}) => {
    const token = bearerTokenStore.getState().token;
    console.log("Fetch contacts start...")
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
                ...(search && {search: search})
            }
        })
        .then(response => {
            if (response.data && response.data.success) {
                console.log("Success:", response.data.message);
                console.log("Pagination:", response.data.data.pagination);

                const pagination = response.data.data.pagination;
                const hasNextPage = !!pagination.nextPageUrl;

                // Get the number of fetched items
                const numberFetched = pagination.perPage; // Current page's items count

                return {
                    data: response.data.data.requests,  // Employee data
                    nextPage: hasNextPage ? page + 1 : undefined,  // If there is a next page
                    search: response.data.data.queryParams?.search || search,  // Current search term
                    numberFetched: numberFetched, // Number of fetched items for this request
                    totalCount: pagination.total // Total number of items
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
            console.log("Fetch contacts finished");
        })
}