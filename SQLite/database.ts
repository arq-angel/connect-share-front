import * as SQLite from 'expo-sqlite';

let dbInstance = null; // Shared variable to store the database instance

const setupDatabaseInstance = async () => {
    if (!dbInstance) {
        try {
            // Open the database asynchronously
            dbInstance = await SQLite.openDatabaseAsync('my_db');
            // console.log("Connected to database");
        } catch (error) {
            console.error('Error setting up the database:', error);
        }
    }
    return dbInstance;
}


const setupEmployeesTable = async (): Promise<true | Error> => {
    try {
        const db = await setupDatabaseInstance();
        await db?.execAsync(`
            PRAGMA journal_mode = WAL;
            DROP TABLE IF EXISTS employees;
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY NOT NULL, 
                firstName TEXT,
                middleName TEXT,
                lastName TEXT,
                image TEXT,
                company TEXT,
                page TEXT,
                timestamp TEXT
            );
        `);
        console.log("Created new employees table");
        return true; // Resolves to true if successful
    } catch (error) {
        console.log("Error creating the employees table:", error);
        return Promise.reject(error); // Rejects with the error
    }
}

const setupFacilities = async () => {
    try {
        const db = await setupDatabaseInstance();
        db?.execAsync(`
            PRAGMA journal_mode = WAL;
            DROP TABLE IF EXISTS facilities;
            CREATE TABLE IF NOT EXISTS facilities (
                id INTEGER PRIMARY KEY NOT NULL, 
                name TEXT,
                image TEXT
              );
            `);
        console.log("Created new facilities table");
    } catch (error) {
        console.log("Error creating the facilities table:", error);
    }
}

export {setupDatabaseInstance, setupEmployeesTable, setupFacilities};