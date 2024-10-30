import axios from 'axios';
import {errorFormat, successFormat} from "@/apis/remote/utils/responseUtils";
import store from "@/redux/store";
import {clearToken} from "@/redux/bearerTokenSlice";
import {getRouter} from "@/utils/routerService";
import Toast from "react-native-toast-message";

const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
const baseUrl = 'https://myapplib.com/api/v1';

// Create an instance
const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor to add bearer token
apiClient.interceptors.request.use(
    async (config) => {
        const bearerToken = store.getState().bearerToken.token;
        // Add bearer token if available
        if (bearerToken) {
            config.headers.Authorization = `Bearer ${bearerToken}`;
        }
        // Append siteToken as a query parameter
        if (siteToken) {
            config.url = config.url?.includes('?')
                ? `${config.url}&siteToken=${siteToken}`
                : `${config.url}?siteToken=${siteToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response) => {
        // console.log("Success response:", response);

        return successFormat(response); // Formats and returns successful responses
    },
    (error) => {
        // console.log("Error response:", error);

        // Check for 401 Unauthorized response
        if (error.response?.status === 401) {
            console.log("Unauthorized response from the server");
            // Automatically log out user on 401
            store.dispatch(clearToken());
            console.log("Stored Token: ", store.getState().bearerToken.token);

            const router = getRouter();

            // Redirect to login screen and reset navigation state
            if (router) {
                router.replace("/(auth)/login"); // Adjust the path to your login route

                Toast.show({
                    type: 'customError',
                    props: {
                        text1: 'Logged Out with error!',
                        text2: 'An unknown error has occurred. Please login again!',
                    }
                });

            }
        }

        // Return the formatted error response
        return Promise.reject(errorFormat(error));
    }
);

export default apiClient;

