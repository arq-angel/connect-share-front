// Helper function to check if 30 minutes have passed since the last fetch
export const hasBeenMoreThan30Minutes = (lastFetchTime) => {
    if (!lastFetchTime) return true; // If no last fetch time, force a refetch

    const lastFetch = new Date(lastFetchTime);
    const now = new Date();
    const timeDifference = (now - lastFetch) / (1000 * 60); // Difference in minutes

    return timeDifference >= 30; // Return true if more than 30 minutes
};