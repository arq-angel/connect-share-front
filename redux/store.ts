import {configureStore} from '@reduxjs/toolkit';
import bearerTokenReducer from "@/redux/bearerTokenSlice";
import {reduxStorage} from "@/redux/redux-mmkv-storage";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: reduxStorage, // Custom MMKV storage here
}

const persistedBearerTokenReducer = persistReducer(persistConfig, bearerTokenReducer);

const store = configureStore({
    reducer: {
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;