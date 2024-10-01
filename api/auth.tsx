import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'https://myapplib.com/api/v1';
const tokenName = "employee-token";

// Function to handle user login
export const login = async (email, password) => {
    try {
        console.log('Sent data: ', email, password);
        const response = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/tokens/create`,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                siteToken: '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac'
            },
            data: {
                email: email,
                password: password,
                tokenName: tokenName,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
