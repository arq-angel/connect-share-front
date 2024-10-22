import {setupDatabaseInstance} from "./database";

const getEmployeesFromDB = async (perPage = 25, page = 1, searchQuery = '') => {
    try {
        const db = await setupDatabaseInstance();

        // calculate the offset for pagination
        const offset = (page -1) * perPage;

        // searchTerm for all fields
        const searchTerm = `%${searchQuery}%`;

        // First, get the total count of employees that match the search
        const countQuery = `
            SELECT COUNT(*) as total FROM employees
            WHERE firstName LIKE ?
            OR middleName LIKE ?
            OR lastName LIKE ?
            OR company LIKE ?;
        `;

        const totalCountResult = await db?.getAllSync(countQuery, [
            searchTerm, searchTerm, searchTerm, searchTerm
        ]);

        const totalCount = totalCountResult?.[0]?.total || 0; // Total number of matching records

        // construct the SQL query with pagination and search functionality
        let query = `
            SELECT * FROM employees
            WHERE firstName LIKE ?
            OR middleName LIKE ?
            OR lastName LIKE ?
            OR company LIKE ?
            LIMIT ? OFFSET ?;
        `;

        // Execute the query with the provided parameters
        const employeeRows = await db?.getAllSync(query, [
            searchTerm, searchTerm, searchTerm, searchTerm, perPage, offset
        ])

        // Log the fetched rows for visibility
        if (employeeRows?.length) {
            employeeRows?.forEach(row => {
                // console.log(`ID: ${row.id}, Name: ${row.firstName} ${row.middleName} ${row.lastName}, Company: ${row.company}`);
            });
        } else {
            console.log('No employees found.');
        }

        // Calculate pagination details
        const totalPages = Math.ceil(totalCount / perPage);
        const pagination = {
            currentPage: page,
            perPage: perPage,
            totalEmployees: totalCount,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null, // If there's a next page, otherwise null
            prevPage: page > 1 ? page - 1 : null, // If there's a previous page, otherwise null
        };

        // Return the success response with pagination and query params
        return {
            success: true,
            message: "Employees retrieved successfully.",
            data: {
                employees: employeeRows,
                pagination: pagination,
                queryParams: {
                    page: page,
                    perPage: perPage,
                    searchQuery: searchQuery
                }
            }
        };
    } catch (error) {
        console.log("Error fetching employees from the database:", error);

        return {
            success: false,
            message: "Error fetching employees from the database.",
            error: error
        };
    }
}

const insertEmployee = async (employee, page) => {
    try {
        const db = await setupDatabaseInstance();

        let query = `INSERT INTO employees (firstName, middleName, lastName, image, company, page) VALUES (?, ?, ?, ?, ?, ?)`;

        await db?.runAsync(query, [
            employee.firstName,
            employee.middleName,
            employee.lastName,
            employee.image,
            employee.company,
            page
        ]);

        // console.log("Inserted employee");
    } catch (error) {
        console.error('Error inserting employees:', error);
    }
}

export {getEmployeesFromDB, insertEmployee};
