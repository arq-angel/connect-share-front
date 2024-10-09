import {create} from "zustand/react";
import {zustandStorage} from "./mmkv-storage";
import {createJSONStorage, persist} from "zustand/middleware";

interface BearerTokenStore {
    token: string | null;
    expiresAt: string | null;
    setToken: (token: string, expiresAt: string) => void;
    clearToken: () => void;
}

export const bearerTokenStore = create<BearerTokenStore>()(
    persist(
        (set) => ({
            token: null, // Initial state of the token
            expiresAt: null, // Initial state of the expiration
            setToken: (token: string, expiresAt: string) => set({ token, expiresAt }), // Function to store the token
            clearToken: () => set({ token: null, expiresAt: null }), // Function to clear the token
        }),
        {
            name: 'bearer-token', // The key for localStorage or other storage solutions
            storage: createJSONStorage(() => zustandStorage), // Using localStorage to persist the token
        }
    )
)

