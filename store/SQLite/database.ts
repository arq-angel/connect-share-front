import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('mydb.db');

const createEmployeeTable = async () => {
    console.log("Creating employee table...");
    await db.execAsync(
        // the DROP statement drops the table so the id starts from 1 everytime by creating a new table
        `DROP TABLE IF EXISTS employees;         
         CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            middleName TEXT,
            lastName TEXT,
            image TEXT,
            company TEXT,
            page INTEGER,
        );`,
    )
        .then((result) => {
            console.log("employees table created successfully");
        })
        .catch((err) => {
            console.log("employees table creation failed: ", err);
        })
        .finally(() => {
            console.log("Creating employee table finished...");
        })
}

export {db, createEmployeeTable};