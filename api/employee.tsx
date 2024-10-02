import axios from 'axios';
import {bearerTokenStore} from "../store/bearerTokenStore";

// Define your API base URL
const API_BASE_URL = 'https://myapplib.com/api/v1';
const tokenName = "employee-token";
const perPage = 15;
const token = bearerTokenStore.getState().token;

export const getAllEmployees = async ({searchQuery, page}) => {
    try {
        console.log('Sent data: ', searchQuery, page);

        if (token) {
            const response = await axios({
                method: 'GET',
                url: `${API_BASE_URL}/employees`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    siteToken: '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac',
                    searchQuery: searchQuery,
                    page: page,
                    perPage: perPage,
                },
            });
            return response.data;
        } else {
            console.log("Token not available")
        }

    } catch (error) {
        console.error('Fetching employees failed:', error.response?.data || error.message); // Improved error message to show actual error data.
        throw error;
    }
}