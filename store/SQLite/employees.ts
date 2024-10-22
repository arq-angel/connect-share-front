import {db} from "./database";

const saveEmployees = async (employees, page) => {

    try {
        for (const employee of employees) {
            await db.runAsync(
                `INSERT INTO employees (firstName, middleName, lastName, image, company, page)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    employee.firstName,
                    employee.middleName,
                    employee.lastName,
                    employee.image,
                    employee.company,
                    page,
                ]
            );
            console.log(`Employee added: ${employee.firstName} ${employee.middleName} ${employee.lastName}`);
        }
        console.log("All employees have been added successfully");
    } catch (error) {
        console.log("Error inserting employees: ", error);
    }
};

const fetchPaginatedEmployees = async (page = 1, perPage = 25) => {
    const offset = (page - 1) * perPage;

    try {
        const employees = await db.getAllAsync(
            `SELECT * FROM employees LIMIT ? OFFSET ?`,
            [perPage, offset],
        );
        console.log("Employees retrieved successfully");
        return employees;
    } catch (error) {
        console.log("Error fetching employees : ", error);
    }
}

const clearEmployeesTable = async () => {
    try {
        await db.runAsync(
            `DELETE FROM employees`
        )
        console.log("All employees deleted successfully");
    } catch (error) {
        console.log("Error deleting all employees: ", error)
    }
}


export {saveEmployees, fetchPaginatedEmployees, clearEmployeesTable};