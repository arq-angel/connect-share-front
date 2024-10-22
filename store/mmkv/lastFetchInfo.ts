import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";
import zustandMMKVStorage from "./zustand";

interface LastFetchInfoStore {
    lastFetchTime: string | null;
    wasSuccess: boolean | null;
    message: string | null;
    wasError: boolean | null;
    error: string | null;
    setLastFetchInfo: (lastFetchTime: string, wasSuccess: boolean | null, message: string | null, wasError: boolean | null, error: string | null) => void;
    clearLastFetchInfo: () => void;
}

// Define the Zustand store with persistence
export const lastFetchInfoStore = create<LastFetchInfoStore>()(
    persist(
        (set) => ({
            lastFetchTime: null,
            wasSuccess: null,
            message: null,
            wasError: null,
            error: null,

            // Method to set fetch information
            setLastFetchInfo: (lastFetchTime: string, wasSuccess: boolean | null, message: string | null, wasError: boolean | null, error: string | null) =>
                set({lastFetchTime, wasSuccess, message, wasError, error}),

            clearLastFetchInfo: () =>
                set({lastFetchTime: null, wasSuccess: null, message: null, wasError: null, error: null}),
        }),
        {
            name: 'last-fetch-info', // Storage key for MMKV
            storage: createJSONStorage(() => zustandMMKVStorage), // Using localStorage to persist the token
            // storage: zustandMMKVStorage, // Directly use zustandMMKVStorage
        }
    ),
)