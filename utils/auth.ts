import store from "@/redux/store";

export const checkTokenStatus = () => {

    const token = store.getState().bearerToken.token;
    const expiresAt = store.getState().bearerToken.expiresAt;

    const currentTime = Date.now();
    const formattedExpiresAt = new Date(expiresAt).getTime();

    console.log("Token: ", token, "Expires At:", expiresAt)

    if (token && currentTime < formattedExpiresAt) {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}