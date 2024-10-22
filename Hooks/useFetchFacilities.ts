import {useEffect, useState} from "react";
import {lastFacilityFetchInfoStore} from "../store/mmkv/lastFacilityFetchInfo";
import {getISOStringTime, hasBeenMoreThan30Minutes} from "../Helpers/appHelpers";
import {useQuery} from "@tanstack/react-query";
import {getFacilitiesFromAPI} from "../api/facility";
import {setupFacilities} from "../store/SQLite/database";
import {lastContactFetchInfoStore} from "../store/mmkv/lastContactFetchInfo";
import {insertFacility} from "../store/SQLite/facilities";


export const useFetchFacilities = () => {
    const [isInserting, setIsInserting] = useState(false);
    const [isDatabaseSetup, setIsDatabaseSetup] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

// Check if more than 30 minutes have passed since the last fetch
    const isFetchRequired = () => {
        const lastFetchTime = lastFacilityFetchInfoStore.getState().lastFetchTime;
        return hasBeenMoreThan30Minutes(lastFetchTime); // Use the helper function to determine if fetch is needed
    };

    // Enable fetching only if it's required
    useEffect(() => {
        if (isFetchRequired()) {
            setShouldFetch(true);
        } else {
            console.log("Last facility fetch was less than 30 minutes ago. Skipping fetch.");
            setShouldFetch(false);
        }
    }, []); // This will check fetch requirement only once on mount


    const {data, error, isFetching, status, refetch, isLoading} = useQuery({
        queryKey: ['facilities', 'live', 'all'],
        queryFn: getFacilitiesFromAPI,
        enabled: shouldFetch,
    });


    useEffect(() => {
        const fetchAndSaveAllFacilities = async () => {
            // Avoid multiple fetches or insertions when another operation is ongoing
            if (!data || isFetching || isInserting) return;

            try {
                setIsInserting(true);

                if (!isDatabaseSetup) {
                    console.log("Setting up the local database...");
                    await setupFacilities(); // Setup database once
                    setIsDatabaseSetup(true);
                }

                // process the fetched facilities
                const facilities = data.data?.requests;

                console.log("Facilities: ", facilities);

                // Save facilities in the DB
                for (const facility of facilities) {
                    await insertFacility(facility); // Insert facility data into the database
                }

            } catch (error) {
                console.error('Error inserting facilities:', error);

                // Save error info
                const fetchTime = getISOStringTime();
                const errorMessage = error.message || "Unknown error occurred.";
                lastFacilityFetchInfoStore.getState().setLastFetchInfo(fetchTime, false, null, true, errorMessage); // Save error state
                console.log("Error Fetch Info: ", { time: lastFacilityFetchInfoStore.getState().lastFetchTime, error: lastFacilityFetchInfoStore.getState().error });

            } finally {
                setIsInserting(false); // Mark insertion as done
            }

        };

        // Trigger facility fetching and saving only if fetching is required
        if (shouldFetch) {
            fetchAndSaveAllFacilities();
        }


    }, [data, isFetching, isInserting, shouldFetch]); // Trigger only when data changes or a new fetch is requested

    // Function to trigger manual refetch on button click
    const handleRefetch = () => {
        console.log("Manual refetch triggered");

        // Clear the last fetch info and reset state before triggering the refetch
        lastContactFetchInfoStore.getState().clearLastFetchInfo(); // Clear the last fetch info

        setShouldFetch(true); // Force the fetch to happen by allowing the query to be enabled again
        refetch(); // Trigger the refetch manually
    };

    return {
        isLoading,
        refetchRemote: handleRefetch,
    };
    
    
}