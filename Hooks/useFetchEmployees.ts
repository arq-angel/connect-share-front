import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmployeesFromAPI } from "../api/contact";
import { insertEmployee } from "../store/SQLite/employees";
import { setupEmployeesTable } from "../store/SQLite/database";
import { lastContactFetchInfoStore } from "../store/mmkv/lastContactFetchInfo";
import { useEffect, useState } from "react";
import {getISOStringTime, hasBeenMoreThan30Minutes} from "../Helpers/appHelpers";
import Toast from "react-native-toast-message";

export const useFetchEmployees = () => {
    const [isInserting, setIsInserting] = useState(false); // Track database insertion
    const [isDatabaseSetup, setIsDatabaseSetup] = useState(false); // Ensure database setup only once
    const [currentPage, setCurrentPage] = useState(0); // Track the current page being processed
    const [previousPage, setPreviousPage] = useState(null); // Track previous page to prevent repeated logging
    const [shouldFetch, setShouldFetch] = useState(false); // Control when fetching is enabled

    // Check if more than 30 minutes have passed since the last fetch
    const isFetchRequired = () => {
        const lastFetchTime = lastContactFetchInfoStore.getState().lastFetchTime;
        return hasBeenMoreThan30Minutes(lastFetchTime); // Use the helper function to determine if fetch is needed
    };

    // Enable fetching only if it's required
    useEffect(() => {
        if (isFetchRequired()) {
            setShouldFetch(true);
        } else {
            console.log("Last employees fetch was less than 30 minutes ago. Skipping fetch.");
            setShouldFetch(false);
        }
    }, []); // This will check fetch requirement only once on mount

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError,
        isLoading,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['employees', 'live'],
        queryFn: ({ pageParam = 1 }) => getEmployeesFromAPI({ page: pageParam }), // Pass pageParam to fetch each page
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.data?.pagination?.nextPage;
            if (nextPage !== previousPage && nextPage > previousPage) {
                console.log("NextPage: ", nextPage);  // Log only when NextPage is new
                setPreviousPage(nextPage);  // Update the previous page state
            }
            return nextPage ? nextPage : undefined;
        },
        enabled: shouldFetch, // Prevent fetching unless fetch is required
    });

    useEffect(() => {
        const fetchAndSaveEmployees = async () => {
            // Avoid multiple fetches or insertions when another operation is ongoing
            if (!data || isFetching || isFetchingNextPage || isInserting) return;

            try {
                setIsInserting(true); // Mark insertion as in progress

                if (!isDatabaseSetup) {
                    console.log("Setting up the local database...");
                    await setupEmployeesTable(); // Setup database once
                    setIsDatabaseSetup(true);
                }

                // Process only the latest fetched page
                const latestPage = data.pages[data.pages.length - 1];
                const employees = latestPage.data.requests;
                const pageNumber = latestPage.data.pagination.currentPage;
                const lastPage = latestPage.data.pagination.lastPage;
                const nextPage = latestPage.data.pagination.nextPage;

                // Prevent reprocessing the same page
                if (currentPage >= pageNumber) return;
                setCurrentPage(pageNumber);

                console.log(`Processing employees from page ${pageNumber} of ${lastPage}`);

                // Save employees for the current page
                for (const employee of employees) {
                    await insertEmployee(employee, pageNumber); // Insert employee data into the database
                }

                // Check if this is the last page
                if (pageNumber === lastPage) {
                    console.log("All pages fetched.");

                    console.log("Saving fetch info...");
                    const fetchTime = getISOStringTime();
                    const fetchMessage = latestPage.message || "Employees retrieved successfully.";
                    lastContactFetchInfoStore.getState().setLastFetchInfo(fetchTime, true, fetchMessage, false, null);
                    console.log("Last Fetch Info: ", { time: lastContactFetchInfoStore.getState().lastFetchTime, message: lastContactFetchInfoStore.getState().message });

                    Toast.show({
                        type: 'customSuccess',
                        props: {
                            text1: 'Fetched Successfully!',
                            text2: 'Contacts have been successfully updated.',
                        }
                    });

                } else if (hasNextPage && !isFetchingNextPage) {
                    console.log(`Fetching NextPage: ${nextPage}`); // Log NextPage only once per fetch
                    await fetchNextPage(); // Fetch next page only after the current page is processed
                }

            } catch (error) {
                console.error('Error inserting employees:', error);

                // Save error info
                const fetchTime = getISOStringTime();
                const errorMessage = error.message || "Unknown error occurred.";
                lastContactFetchInfoStore.getState().setLastFetchInfo(fetchTime, false, null, true, errorMessage); // Save error state
                console.log("Error Fetch Info: ", { time: lastContactFetchInfoStore.getState().lastFetchTime, error: lastContactFetchInfoStore.getState().error });

            } finally {
                setIsInserting(false); // Mark insertion as done
            }
        };

        // Trigger employee fetching and saving only if fetching is required
        if (shouldFetch) {
            fetchAndSaveEmployees();
        }

    }, [data, isFetching, isFetchingNextPage, isInserting, shouldFetch]); // Trigger only when data changes or a new page is processed

    // Function to trigger manual refetch on button click
    const handleRefetch = () => {
        console.log("Manual refetch triggered");

        // Clear the last fetch info and reset state before triggering the refetch
        lastContactFetchInfoStore.getState().clearLastFetchInfo(); // Clear the last fetch info
        setCurrentPage(0); // Reset the current page
        setPreviousPage(null); // Reset the previous page

        setShouldFetch(true); // Force the fetch to happen by allowing the query to be enabled again
        refetch(); // Trigger the refetch manually
    };

    return {
        isLoading,
        isFetchingNextPage,
        refetchRemote: handleRefetch,
    };
};
