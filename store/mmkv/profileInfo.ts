import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";
import zustandMMKVStorage from "./zustand";

interface ProfileInfo {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    image: string | null;
    email: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    address: string | null;
    suburb: string | null;
    state: string | null;
    postCode: string | null;
    country: string | null;
    setProfileInfo: (
        firstName: string,
        middleName: string,
        lastName: string,
        image: string,
        email: string,
        phone: string,
        dateOfBirth: string,
        gender: string,
        address: string,
        suburb: string,
        state: string,
        postCode: string,
        country: string,
        ) => void;
    clearProfileInfo: () => void;
}

// Define the Zustand store with persistence
export const profileInfo = create<ProfileInfo>()(
    persist(
        (set) => ({
            firstName: null,
            middleName: null,
            lastName: null,
            image: null,
            email: null,
            phone: null,
            dateOfBirth: null,
            gender: null,
            address: null,
            suburb: null,
            state: null,
            postCode: null,
            country: null,

            // Method to set fetch information
            setProfileInfo: (
                firstName: string | null,
                middleName: string | null,
                lastName: string | null,
                image: string | null,
                email: string | null,
                phone: string | null,
                dateOfBirth: string | null,
                gender: string | null,
                address: string | null,
                suburb: string | null,
                state: string | null,
                postCode: string | null,
                country: string | null,
            ) =>
                set({
                    firstName,
                    middleName,
                    lastName,
                    image,
                    email,
                    phone,
                    dateOfBirth,
                    gender,
                    address,
                    suburb,
                    state,
                    postCode,
                    country,
                }),

            clearProfileInfo: () =>
                set({
                    firstName: null,
                    middleName: null,
                    lastName: null,
                    image: null,
                    email: null,
                    phone: null,
                    dateOfBirth: null,
                    gender: null,
                    address: null,
                    suburb: null,
                    state: null,
                    postCode: null,
                    country: null,
                }),
        }),
        {
            name: 'profile-info', // Storage key for MMKV
            storage: createJSONStorage(() => zustandMMKVStorage), // Using localStorage to persist the token
            // storage: zustandMMKVStorage, // Directly use zustandMMKVStorage
        }
    ),
)