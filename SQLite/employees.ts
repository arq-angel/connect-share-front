import {db} from "./Database";

const saveEmployees = (employees, page) => {

    console.log('Page: ', page);

    db.transaction(tx => {
        employees.forEach(employee => {
            tx.executeSql(
                `INSERT INTO employees (firstName, middleName, lastName, image, company, page)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    employee.firstName,
                    employee.middleName,
                    employee.lastName,
                    employee.image,
                    employee.company,
                    page,
                ],
                (tx, result) => {
                    console.log('Employee added:', result.insertId);
                },
                error => {
                    console.log('Error inserting employee:', error);
                }
            );
        });
    });
};

const fetchPaginatedEmployees = (page = 1, perPage = 25) => {
    const offset = (page - 1) * perPage;

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM employees LIMIT ? OFFSET ?`,
                [perPage, offset],
                (tx, result) => {
                    let employees = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        employees.push(result.rows.item[i]);
                    }
                    resolve(employees);
                },
                error => {
                    reject(error);
                }
            )
        })
    })
}

const clearEmployeesTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM employees`,
                [],
                (tx, result) => resolve(result),
                error => reject(error),
                (tx, result) => {
                    console.log('Rows affected:', result.rowsAffected); // Log the number of rows affected
                    resolve(result); // Resolve the promise with the result
                },
                (tx, error) => {
                    console.error('Error deleting from employees:', error); // Log the error for debugging
                    reject(error); // Reject the promise with the error
                }
            )
        })
    })
}


export {saveEmployees, fetchPaginatedEmployees, clearEmployeesTable};