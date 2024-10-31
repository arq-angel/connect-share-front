import {insertEmployeesBatch} from "@/SQLite/employees";

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
