import { useMutation } from "@tanstack/react-query";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (loginData) => {
            console.log("Login fetch start")
            const response = await fetch('https://myapplib.com/api/v1/login?siteToken=' + siteToken, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                    deviceName: loginData.deviceName
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Convert response to JSON
            console.log('Response:', data);

            if (!data.success) {
                console.error('HTTP Error:', data);
                return Promise.reject(data.message);  // Reject the promise to trigger error handling
            }

            if (data?.message === 'Unauthenticated') {
                console.log('Error:', data.message);
                return Promise.reject('Unauthenticated');  // Trigger an error for further handling
            }

            // Check for the expected token in the response and return the data
            if (data.success && data.data?.token) {
                console.log('Login successful, token:', data.data.token);
                return {
                    token: data.data.token,
                    expiresAt: data.data.expiresAt,
                    message: data.message
                };  // Return the token and additional information
            }

            return Promise.reject('Unexpected response format');
        }
    });
};

export const useConfirmToken = () => {
    return useMutation({
        mutationFn: async (token) => {
            console.log("Verify token fetch start");

            const response = await fetch('https://myapplib.com/api/v1/validate-token?siteToken=' + siteToken, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
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
            if (data.success && data.message === 'Valid Bearer token') {
                console.log('Token verification successful:', data.message);
                return {
                    message: data.message,
                    verified: true
                };  // Return success message
            }

            return Promise.reject('Unexpected response format');
        }
    })
}
