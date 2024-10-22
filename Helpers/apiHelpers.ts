// change the success response format to universal success format
export const successFormat = (response) => {
    console.log("successFormat start...");

    let returnData = {
        success: false,
        message: "Error occurred while parsing success response...",
        data: {},
    }

    let responseData = null;
    if (response.status === 200) {
        responseData = response.data;
    } else {
        returnData.message = `Unexpected status code: ${response ? response.status : 'No response'}`;
    }

    if (responseData && responseData.success && responseData.message == 'Valid Bearer token') {
        returnData.success = true;
        returnData.data = {};
        returnData.message = "Valid Bearer token. Logged in successfully!";
    }

    if (responseData && responseData.success && responseData.message == 'Token Generated') {
        returnData.success = true;
        returnData.data = responseData.data; // returns the object with token, expiresAt and tokenName which is deviceName - need to change in the future
        returnData.message = responseData.message;
    }

    if (responseData && responseData.success && responseData.message !== 'Valid Bearer token') {    // for all other scenarios except token validation
        returnData.success = true;

        if (responseData.data.length > 0) {
            returnData.data = {
                requests: responseData.requests,
                pagination: responseData.pagination,
                queryParams: responseData.queryParams,
            };
        }
        returnData.message = responseData.message;
    } else {
        returnData.message = responseData?.message || "Unknown success response.";
    }

    console.log('successFormat Return data: ', returnData);
    return returnData;
}

// change the error response format to universal error format
export const errorFormat = (error) => {
    console.log("errorFormat start...");
    let returnData = {
        success: false,
        message: "Error occurred while parsing error response...",
        errors: {},
        debug: {
            code: '',
            status: '',
            message: '',
        }
    }

    console.log("Axios Error Code:", error.response.status);
    let errorCode = null;
    let responseData = null;
    if (error.response) {
        errorCode = error.response.status;
        responseData = error.response.data;

        returnData.debug.code = errorCode;
    }

    if (errorCode) {
        switch (errorCode) {
            case 400:
                returnData.message = "Bad Request.";
                returnData.debug.message = responseData?.message || "Bad Request. Missing or invalid site token.";
                returnData.debug.status = 'Bad Request';
                break;
            case 401:
                returnData.message = "Unauthorized.";
                returnData.debug.message = responseData?.message || "Unauthorized. Missing or invalid bearer token.";
                returnData.debug.status = 'Unauthorized';
                break;
            case 403:
                returnData.message = "Forbidden.";
                returnData.debug.message = responseData?.message || "Forbidden. You do not have permission to access this resource.";
                returnData.debug.status = 'Forbidden';
                break;
            case 404:
                returnData.message = "Not Found.";
                returnData.debug.message = responseData?.message || "Not Found. The requested resource could not be located.";
                returnData.debug.status = 'Not Found';
                break;
            case 422:
                returnData.message = "Unprocessable Entity.";
                returnData.debug.message = responseData?.message || "Unprocessable Entity. The request could not be processed.";
                returnData.debug.status = 'Unprocessable Entity';
                returnData.errors = responseData?.errors || {};  // Assuming validation errors or similar
                break;

            case 500:
                returnData.message = "Internal Server Error.";
                returnData.debug.message = responseData?.message || "Internal Server Error. Something went wrong on the server.";
                returnData.debug.status = 'Internal Server Error.';
                break;
            default:
                returnData.message = "Forbidden request.";
                returnData.debug.message = responseData?.message || "Forbidden. You do not have permission to access this resource.";
                returnData.debug.status = 'Forbidden';
                break;
        }
    } else if (error.request) {
        // Handle no response from the server
        returnData.message = "No response from server. Please check your network connection.";
        returnData.debug.status = 'No Response';
    } else {
        // Handle other errors (e.g., setup or unknown errors)
        returnData.message = error.message || "An unknown error occurred.";
        returnData.debug.status = 'Unknown Error';
    }

    console.log("errorFormat return data: ", returnData);

    return returnData;
}
