import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'EmployeeDB',
        location: 'default',
    },
    () => {
        console.log("Database connection open");
    },
    error => {
        console.log("Database connection closed");
    }
);

const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS employees(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                middleName TEXT,
                lastName TEXT,
                image TEXT,
                company TEXT,
                page TEXT,
            );`,
            [],
            () => {
                console.log("Table created successfully");
            },
            error => {
                console.log('Error creating table', error)
            }
        )
    })
}

export {db, createTable};
