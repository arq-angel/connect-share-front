import {setupDatabaseInstance} from "./database";

const getEmployeesFromDB = async () => {
    try {
        const db = await setupDatabaseInstance();

        const employeeRows = await db?.getAllAsync("SELECT * FROM employees");

        // Log the fetched rows for visibility
        if (employeeRows?.length) {
            employeeRows?.forEach(row => {
                console.log(`ID: ${row.id}, Name: ${row.firstName} ${row.middleName} ${row.lastName}, Company: ${row.company}`);
            });
        } else {
            console.log('No employees found.');
        }

        return employeeRows;
    } catch (error) {
        console.log("Error fetching employees from the database:", error);
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
