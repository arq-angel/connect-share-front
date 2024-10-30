import apiClient from "@/apis/remote/configs/axiosConfig";

// GET Request
export const getRequest = async (url: string, params = {}) => {
    try {
        return await apiClient.get(url, params);
    } catch (error) {
        return Promise.reject(error);
    }
}

// POST Request
export const postRequest = async (url: string, data = {}) => {
    try {
        return await apiClient.post(url, data);
    } catch (error) {
        return Promise.reject(error);
    }
};

// PUT Request
export const putRequest = async (url: string, data = {}) => {
    try {
        return await apiClient.put(url, data);
    } catch (error) {
        return Promise.reject(error);
    }
};

// DELETE Request
export const deleteRequest = async (url: string, data = {}) => {
    try {
        return await apiClient.delete(url, { data });
    } catch (error) {
        return Promise.reject(error);
    }
};
