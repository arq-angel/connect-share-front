import {createSlice} from '@reduxjs/toolkit';

interface LocalDatabaseSetupState {
    // databaseInstance: boolean;   // because it is set when we create the employees or facilities table in database.ts
    employeesTable: boolean;
    facilitiesTable: boolean;
}

const initialState : LocalDatabaseSetupState = {
    // databaseInstance: false,
    employeesTable: false,
    facilitiesTable: false,
}

const localDatabaseSetupReducer = createSlice({
    name: 'local-database-setup',
    initialState,
    reducers: {
        setSetup: (state, action) => {
            // state.databaseInstance = action.payload.databaseInstance;
            state.employeesTable = action.payload.employeesTable;
            state.facilitiesTable = action.payload.facilitiesTable;
        },
        clearSetup: (state) => {
            // state.databaseInstance = false;
            state.employeesTable = false;
            state.facilitiesTable = false;
        },
    },
});

export const {setSetup, clearSetup} = localDatabaseSetupReducer.actions;
export default localDatabaseSetupReducer.reducer;