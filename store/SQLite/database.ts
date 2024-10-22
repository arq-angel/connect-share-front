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


const setupEmployeesTable = async () => {
    try {
        const db = await setupDatabaseInstance();
        db?.execAsync(`
            PRAGMA journal_mode = WAL;
            DROP TABLE IF EXISTS employees;
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY NOT NULL, 
                firstName TEXT,
                middleName TEXT,
                lastName TEXT,
                image TEXT,
                company TEXT,
                page TEXT
              );
            `);
        // console.log("Created new employees table");
    } catch (error) {
        console.log("Error creating the employees table:", error);
    }
}

export {setupDatabaseInstance, setupEmployeesTable};
