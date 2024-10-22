// Helper to change the date time to the same format throughout the app
export const getISOStringTime = () => {
    return new Date().toISOString(); // Generates an ISO 8601 string
};

// Helper function to check if 30 minutes have passed since the last fetch
export const hasBeenMoreThan30Minutes = (lastFetchTime) => {
    if (!lastFetchTime) return true; // If no last fetch time, force a refetch

    const lastFetch = new Date(lastFetchTime); // Parse the last fetch time
    const now = new Date(); // Get the current time

    const timeDifference = (now - lastFetch) / (1000 * 60); // Calculate difference in minutes

    return timeDifference >= 30; // Return true if more than 30 minutes have passed
};
