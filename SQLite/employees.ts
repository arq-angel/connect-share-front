import {setupDatabaseInstance, setupEmployeesTable} from "./database";
import store from "@/redux/store";
import {setSetup} from "@/redux/localDatabaseSetupSlice";

const getEmployeesFromDB = async (perPage = 25, page = 1, searchQuery = '') => {
    let db;
    let countStatement;
    let selectStatement;

    try {
        db = await setupDatabaseInstance();

        // Calculate the offset for pagination
        const offset = (page - 1) * perPage;
        const searchTerm = `%${searchQuery}%`;

        // Prepare the count query to get the total number of matching employees
        countStatement = await db.prepareAsync(`
            SELECT COUNT(*) as total FROM employees
            WHERE firstName LIKE $searchTerm
            OR middleName LIKE $searchTerm
            OR lastName LIKE $searchTerm
            OR company LIKE $searchTerm;
        `);

        // Execute the count query
        const countResult = await countStatement.executeAsync({ $searchTerm: searchTerm });
        const totalCountRow = await countResult.getFirstAsync();
        const totalCount = totalCountRow ? totalCountRow.total : 0;

        // Prepare the main query with pagination and search functionality
        selectStatement = await db.prepareAsync(`
            SELECT * FROM employees
            WHERE firstName LIKE $searchTerm
            OR middleName LIKE $searchTerm
            OR lastName LIKE $searchTerm
            OR company LIKE $searchTerm
            LIMIT $perPage OFFSET $offset;
        `);

        // Execute the main query
        const selectResult = await selectStatement.executeAsync({
            $searchTerm: searchTerm,
            $perPage: perPage,
            $offset: offset
        });

        // Fetch all matching employee records
        const employeeRows = await selectResult.getAllAsync();

        // Calculate pagination details
        const totalPages = Math.ceil(totalCount / perPage);
        const pagination = {
            currentPage: page,
            perPage: perPage,
            totalEmployees: totalCount,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
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
    } finally {
        // Finalize prepared statements to release resources
        if (countStatement) await countStatement.finalizeAsync();
        if (selectStatement) await selectStatement.finalizeAsync();
    }
};

const insertEmployee = async (employee, page) => {
    let db;
    let insertStatement;
    let selectStatement;

    try {
        db = await setupDatabaseInstance();

        // Prepare the insertion statement
        const timestamp = new Date().toISOString();
        insertStatement = await db.prepareAsync(
            `INSERT INTO employees (firstName, middleName, lastName, image, company, page, timestamp)
             VALUES ($firstName, $middleName, $lastName, $image, $company, $page, $timestamp)`
        );

        // Execute the prepared insert statement
        const insertResult = await insertStatement.executeAsync({
            $firstName: employee.firstName,
            $middleName: employee.middleName,
            $lastName: employee.lastName,
            $image: employee.image,
            $company: employee.company,
            $page: page,
            $timestamp: timestamp
        });

        // Prepare and execute the selection statement to get the last inserted employee
        selectStatement = await db.prepareAsync(`SELECT * FROM employees WHERE id = last_insert_rowid()`);
        const result = await selectStatement.executeAsync();
        const insertedEmployee = await result.getFirstAsync();

        return insertedEmployee;
    } catch (error) {
        console.error('Error inserting employee:', error);
        return null; // Handle errors as needed in batch processing
    } finally {
        // Finalize prepared statements
        if (insertStatement) await insertStatement.finalizeAsync();
        if (selectStatement) await selectStatement.finalizeAsync();
    }
};

const insertEmployeesBatch = async (employees, page) => {
    const db = await setupDatabaseInstance();

    // Ensure the employees table is set up
    if (!store.getState().localDatabaseSetup.employeesTable) {
        try {
            const setupSuccess = await setupEmployeesTable();
            console.log("setupSuccess", setupSuccess);
            if (setupSuccess === true) {
                // Update Redux state to mark employeesTable as set up and save the facilitiesTable state as it was
                store.dispatch(setSetup({
                    employeesTable: true,
                    facilitiesTable: store.getState().localDatabaseSetup.facilitiesTable
                }));
            }
        } catch (error) {
            console.log("Failed to set up employees table:", error);
            return; // Exit if table setup fails
        }
    }

    try {
        await db.execAsync("BEGIN TRANSACTION"); // Begin transaction

        for (const employee of employees) {
            const result = await insertEmployee(employee, page);
            if (!result || !result.id) {
                console.log(`Failed to insert employee: ${employee.firstName} ${employee.lastName}`);
            }
            // console.log(`Employee with ID ${result.id} inserted successfully.`);
        }

        await db.execAsync("COMMIT"); // Commit transaction
        console.log(`Page: ${page} Batch insert committed successfully.`);
    } catch (error) {
        console.log("Error in batch insert:", error);
        await db.execAsync("ROLLBACK"); // Rollback transaction on failure
    }
};

export {getEmployeesFromDB, insertEmployee, insertEmployeesBatch};