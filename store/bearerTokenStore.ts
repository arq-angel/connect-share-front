import {create} from "zustand/react";
import {zustandStorage} from "./mmkv-storage";
import {createJSONStorage, persist} from "zustand/middleware";

interface BearerTokenStore {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const bearerTokenStore = create<BearerTokenStore>()(
    persist(
        (set) => ({
            token: null, // Initial state of the token
            setToken: (token: string) => set({ token }), // Function to store the token
            clearToken: () => set({ token: null }), // Function to clear the token
        }),
        {
            name: 'employee-token', // The key for localStorage or other storage solutions
            storage: createJSONStorage(() => zustandStorage), // Using localStorage to persist the token
        }
    )
)

