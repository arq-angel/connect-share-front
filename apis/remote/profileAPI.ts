import {getRequest} from "@/apis/remote/configs/axiosUtils";

export const getUserProfile = async () => {
    console.log("Get user profile start...");
    const profileUrl = '/profile';

    return getRequest(profileUrl)
        .then((response) => {
            // console.log("Success at getUserProfile: ", response);
            return response;
        })
        .catch((error) => {
            // console.log("Error at getUserProfile: ", error);
            return Promise.reject(error);
        })
        .finally(() => {
            console.log("Get user profile finished...");
        });
}