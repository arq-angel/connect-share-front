import {getEmployeesFromDB, insertEmployeesBatch} from "@/SQLite/employees";

export const insertEmployeesBatchAPI = async (employees, page) => {
    try {
        // Call the underlying function to insert the employees
        await insertEmployeesBatch(employees, page);

        // Return a standardized success response
        return {
            success: true,
            message: `Page ${page}: Employees batch inserted successfully.`
        };
    } catch (error) {
        console.log("API Error in inserting employees batch:", error);

        // Return a standardized error response
        return {
            success: false,
            message: "Failed to insert employees batch.",
            error: error.message || error
        };
    }
};

export const fetchPaginatedEmployeesAPI = async (perPage = 25, page = 1, searchQuery = '') => {
    try {
        // Call the function to fetch employees with pagination
        const result = await getEmployeesFromDB(perPage, page, searchQuery);

        if (result.success) {
            // Return a successful API response
            return {
                success: true,
                message: result.message,
                data: result.data
            };
        } else {
            // Handle any known errors from getEmployeesFromDB
            return {
                success: false,
                message: result.message,
                error: result.error
            };
        }
    } catch (error) {
        console.log("API Error in fetching paginated local employees:", error);

        // Return a standardized error response
        return {
            success: false,
            message: "Failed to fetch employees from the local database.",
            error: error.message || error
        };
    }
};
