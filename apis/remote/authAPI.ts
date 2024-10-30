import {postRequest, getRequest} from "@/apis/remote/configs/axiosUtils";

export const handleLogin = (loginData: { email: string; password: string; deviceName?: string }) => {
    console.log("Login start...");
    const loginUrl = '/login';
    const data = {
        email: loginData.email,
        password: loginData.password,
        deviceName: loginData.deviceName || 'iOS Emulator',
    };

    return postRequest(loginUrl, data)
        .then((response) => {
            // console.log("Login successful at authAPI:", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error during login at authAPI:", error);
            return Promise.reject(error); // Return the error response instead of throwing it
        })
        .finally(() => {
            console.log("Login finished...");
        });
};

export const handleLogout = () => {
    console.log("Logout start...");
    const logoutUrl = '/logout';

    return postRequest(logoutUrl, null)
        .then((response) => {
            // console.log("Logout successful at authAPI:", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error during logout at authAPI:", error);
            return Promise.reject(error); // Return the error response instead of throwing it
        })
        .finally(() => {
            console.log("Logout finished...");
        });
};

export const confirmTokenValidity = () => {
    console.log("Token confirmation start...");
    const validateTokenUrl = '/validate-token';

    return getRequest(validateTokenUrl)
        .then((response) => {
            // console.log("Token confirmation successful at authAPI:", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error during token confirmation at authAPI:", error);
            return Promise.reject(error); // Return the error response instead of throwing it
        })
        .finally(() => {
            console.log("Token confirmation finished...");
        });
};
