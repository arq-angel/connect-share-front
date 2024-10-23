import {setupDatabaseInstance} from "./database";

const getFacilitiesFromDB = async (perPage = 25, page = 1, searchQuery = '') => {
    try {
        const db = await setupDatabaseInstance();

        // calculate the offset for pagination
        const offset = (page -1) * perPage;

        // searchTerm for all fields
        const searchTerm = `%${searchQuery}%`;

        // First, get the total count of facilities that match the search
        const countQuery = `
            SELECT COUNT(*) as total FROM facilities
            WHERE name LIKE ?;
        `;

        const totalCountResult = await db?.getAllSync(countQuery, [
            searchTerm
        ]);

        const totalCount = totalCountResult?.[0]?.total || 0; // Total number of matching records

        // construct the SQL query with pagination and search functionality
        let query = `
            SELECT * FROM facilities
            WHERE name LIKE ?;
        `;

        // Execute the query with the provided parameters
        const facilitiesRows = await db?.getAllSync(query, [
            searchTerm
            // , perPage, offset        // its not implemented for facilities
        ])

        // Log the fetched rows for visibility
        if (facilitiesRows?.length) {
            facilitiesRows?.forEach(row => {
                // console.log(`ID: ${row.id}, Company Name: ${row.name}`);
            });
        } else {
            console.log('No facilities found.');
        }

        // Calculate pagination details
        const totalPages = Math.ceil(totalCount / perPage);
        const pagination = {
            currentPage: page,
            perPage: perPage,
            totalFacilities: totalCount,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null, // If there's a next page, otherwise null
            prevPage: page > 1 ? page - 1 : null, // If there's a previous page, otherwise null
        };

        // Return the success response with pagination and query params
        return {
            success: true,
            message: "Facilities retrieved successfully.",
            data: {
                facilities: facilitiesRows,
                pagination: pagination,
                queryParams: {
                    page: page,
                    perPage: perPage,
                    searchQuery: searchQuery
                }
            }
        };
    } catch (error) {
        console.log("Error fetching facilities from the database:", error);

        return {
            success: false,
            message: "Error fetching facilities from the database.",
            error: error
        };
    }
}

const insertFacility = async (facility) => {
    try {
        const db = await setupDatabaseInstance();

        let query = `INSERT INTO facilities ( name, image) VALUES ( ?, ?)`;

        await db?.runAsync(query, [
            facility.name,
            facility.image
        ]);

        // console.log("Inserted facility");
        return true;
    } catch (error) {
        console.error('Error inserting facilities:', error);
        return false;
    }
}

export {getFacilitiesFromDB, insertFacility};
