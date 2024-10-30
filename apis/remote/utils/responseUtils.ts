// Success response formatting function
export const successFormat = (response: any) => {
    // console.log("Formatting success response...");

    let returnData = {
        success: false,
        message: "Error occurred while parsing success response...",
        data: {},
    };

    const responseData = response.status === 200 ? response.data : null;

    if (responseData?.success) {
        returnData.success = true;
        returnData.message = responseData.message || "Request succeeded.";

        if (responseData.message === 'Valid Bearer token') {
            returnData.message = "Valid Bearer token. Logged in successfully!";
        }

        returnData.data = responseData.data || {};
    } else {
        returnData.message = responseData?.message || "Unknown success response.";
    }

    // console.log("Success formatted response: ", returnData);
    return returnData;
};

// Error response formatting function
export const errorFormat = (error: any) => {
    // console.log("Formatting error response...");

    let returnData = {
        success: false,
        message: "Error occurred while parsing error response...",
        errors: {},
        debug: {
            code: '',
            status: '',
            message: '',
        },
    };

    if (error.response) {
        const { status, data } = error.response;
        returnData.debug.code = status;
        returnData.debug.message = data?.message || "Error occurred.";
        returnData.debug.status = status.toString();

        switch (status) {
            case 400:
                returnData.message = "Bad Request.";
                break;
            case 401:
                returnData.message = "Unauthorized.";
                break;
            case 403:
                returnData.message = "Forbidden.";
                break;
            case 404:
                returnData.message = "Not Found.";
                break;
            case 422:
                returnData.message = "Unprocessable Entity.";
                returnData.errors = data?.errors || {};
                break;
            case 500:
                returnData.message = "Internal Server Error.";
                break;
            default:
                returnData.message = "Unexpected error occurred.";
        }
    } else if (error.request) {
        returnData.message = "No response from server. Please check your network connection.";
    } else {
        returnData.message = error.message || "An unknown error occurred.";
    }

    // console.log("Error formatted response: ", returnData);
    return returnData;
};