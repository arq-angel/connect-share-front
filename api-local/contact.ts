// fetch the locally saved employees
import {getEmployeesFromDB} from "../store/SQLite/employees";

export const getLocalEmployees = async ({page = 1, perPage = 25, searchTerm = ''}) => {
    console.log("Local employees fetch start...")

    try {
        // Await the asynchronous call to fetch employees
        const employees = await getEmployeesFromDB(perPage, page, searchTerm)

        // Return the promise with success and the data
        return Promise.resolve({
            success: true,
            message: "Employees retrieved from local DB successfully.",
            data: employees
        })

    } catch (error) {
        // Return a rejected promise with the error message
        return Promise.reject({
            success: false,
            message: error || "An error occurred while fetching employees.",
        });
    } finally {
        console.log("Local employees fetch finished.");
    }

}