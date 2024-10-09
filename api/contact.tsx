import {useMutation} from "@tanstack/react-query";
import {bearerTokenStore} from "../store/bearerTokenStore";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';

export const useFetchEmployees = () => {

    return useMutation({
        mutationFn: async (requestData) => {
            console.log("Employee list fetch start");

            const url = '';

            const response = await fetch('https://myapplib.com/api/v1/employees?siteToken=' + siteToken, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${requestData.token}`
                }
            });

            if (!response.ok) {
                // Handle non-200 HTTP status codes
                return Promise.reject(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Parse the response as JSON
            console.log('Response:', data);

            if (!data.success) {
                console.error('Error:', data);
                return Promise.reject(data.message);  // Reject to trigger error handling
            }

            // Check if the token is valid based on the response
            if (data.success) {
                console.log('Message:', data.message);
                return {
                    data: data.data.requests,
                    message: data.message,
                    success: true
                };  // Return success message
            }

            return Promise.reject('Unexpected response format');
        }
    })
}