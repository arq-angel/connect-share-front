// Helper to change the date time to the same format throughout the app
import {useEffect, useState} from "react";

export const getISOStringTime = () => {
    return new Date().toISOString(); // Generates an ISO 8601 string
};

export const getExpiresAtForFetch = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Adds 30 minutes
    // now.setSeconds(now.getSeconds() + 30); // Adds seconds for testing
    return now.toISOString(); // Returns an ISO 8601 string
}

export const checkIfExpired = (expiresAt: string): boolean => {
    const now = new Date();
    const expirationTime = new Date(expiresAt);
    return now >= expirationTime;
}


// Helper function to check if 30 minutes have passed since the last fetch
export const hasBeenMoreThan30Minutes = (lastFetchTime) => {
    if (!lastFetchTime) return true; // If no last fetch time, force a refetch

    const lastFetch = new Date(lastFetchTime); // Parse the last fetch time
    const now = new Date(); // Get the current time

    const timeDifference = (now - lastFetch) / (1000 * 60); // Calculate difference in minutes

    return timeDifference >= 30; // Return true if more than 30 minutes have passed
};

// Helper function to resolve image loading urls
export const resolveImageUrl = (path) => {
    const url = "https://myapplib.com/";

    // console.log("New image URL: ", url + path);
    return  url + path;
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value after the delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup the timeout if the value changes before the delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Only re-run the effect if value or delay changes

    return debouncedValue;
}