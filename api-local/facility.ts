// fetch the locally saved facilities
import {getFacilitiesFromDB} from "../store/SQLite/facilities";

export const getLocalFacilities = async ({page = 1, perPage = 25, searchTerm = ''}) => {
    console.log("Local facilities fetch start...")

    try {
        // Await the asynchronous call to fetch facilities
        const facilities = await getFacilitiesFromDB(perPage, page, searchTerm)

        // Return the promise with success and the data
        return Promise.resolve({
            success: true,
            message: "Facilities retrieved from local DB successfully.",
            data: facilities
        })

    } catch (error) {
        // Return a rejected promise with the error message
        return Promise.reject({
            success: false,
            message: error || "An error occurred while fetching facilities.",
        });
    } finally {
        console.log("Local facilities fetch finished.");
    }

}