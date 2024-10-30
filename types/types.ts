export interface LoginData {
    email: string;
    password: string;
    deviceName: string;
}

export interface LoginResponse {
    success: boolean,
    message: string,
    data: {
        token: string,
        tokenName: string,
        expiresAt: string
    }
}