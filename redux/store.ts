import {configureStore} from '@reduxjs/toolkit';
import exampleSlice from "./exampleSlice";
import bearerTokenReducer from "./bearerTokenSlice";
import {reduxStorage} from "./mmkv-storage";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: reduxStorage, // Custom MMKV storage here
}

const persistedBearerTokenReducer = persistReducer(persistConfig, bearerTokenReducer);

const store = configureStore({
    reducer: {
        example: exampleSlice,
        bearerToken: persistedBearerTokenReducer, // Use the persisted reducer here
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
export default store;
