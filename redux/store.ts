import {configureStore} from '@reduxjs/toolkit';
import bearerTokenReducer from "@/redux/bearerTokenSlice";
import employeesFetchInfoReducer from "@/redux/employeesFetchInfoSlice";
import {reduxStorage} from "@/redux/redux-mmkv-storage";
import {persistReducer, persistStore} from "redux-persist";
import localDatabaseSetupReducer from "@/redux/localDatabaseSetupSlice";
import favouriteContactsReducer from "@/redux/favouriteContactsSlice";

// Separate persist configurations for each reducer
const bearerTokenPersistConfig = {
    key: 'bearerToken',
    storage: reduxStorage,
};

const employeesFetchInfoPersistConfig = {
    key: 'employeesFetchInfo',
    storage: reduxStorage,
};

const favouriteContactsPersistConfig = {
    key: 'favouriteContacts',
    storage: reduxStorage,
}

const persistedBearerTokenReducer = persistReducer(bearerTokenPersistConfig, bearerTokenReducer);
const persistedEmployeesFetchInfoReducer = persistReducer(employeesFetchInfoPersistConfig, employeesFetchInfoReducer);
const persistedFavouriteContactsReducer = persistReducer(favouriteContactsPersistConfig, favouriteContactsReducer)

const store = configureStore({
    reducer: {
        // Use the persisted reducer here
        bearerToken: persistedBearerTokenReducer,
        employeesFetchInfo: persistedEmployeesFetchInfoReducer,
        favouriteContacts: persistedFavouriteContactsReducer,

        // Non persisted reducer
        localDatabaseSetup: localDatabaseSetupReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions that contain non-serializable values
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;