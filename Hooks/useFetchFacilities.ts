import {useEffect, useState} from "react";
import {lastFacilityFetchInfoStore} from "../store/mmkv/lastFacilityFetchInfo";
import {getISOStringTime, hasBeenMoreThan30Minutes} from "../Helpers/appHelpers";
import {useQuery} from "@tanstack/react-query";
import {getFacilitiesFromAPI} from "../api/facility";
import {setupFacilities} from "../store/SQLite/database";
import {lastContactFetchInfoStore} from "../store/mmkv/lastContactFetchInfo";
import {insertFacility} from "../store/SQLite/facilities";
import Toast from "react-native-toast-message";


export const useFetchFacilities = () => {
    const [isInserting, setIsInserting] = useState(false);
    const [isDatabaseSetup, setIsDatabaseSetup] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const isFetchRequired = () => {
        const lastFetchTime = lastFacilityFetchInfoStore.getState().lastFetchTime;
        return hasBeenMoreThan30Minutes(lastFetchTime); // Use the helper function to determine if fetch is needed
    };

    useEffect(() => {
        if (isFetchRequired()) {
            console.log("More than 30 minutes since last fetch. Fetching facilities...");
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
            if (!data || isFetching || isInserting) return;

            try {
                setIsInserting(true);

                if (!isDatabaseSetup) {
                    console.log("Setting up the local database...");
                    await setupFacilities();
                    setIsDatabaseSetup(true);
                }

                const facilities = data.data?.requests;

                if (facilities?.length) {
                    for (const facility of facilities) {
                        try {
                            await insertFacility(facility);
                        } catch (error) {
                            console.log("Error inserting facility: ", error);
                        }
                    }
                }

                const fetchTime = getISOStringTime();
                const fetchMessage = data.message || "Facilities retrieved successfully.";
                lastFacilityFetchInfoStore.getState().setLastFetchInfo(fetchTime, true, fetchMessage, false, null);

                Toast.show({
                    type: 'customSuccess',
                    props: {
                        text1: 'Fetched Successfully!',
                        text2: 'Facilities have been successfully updated.',
                    }
                });
            } catch (error) {
                console.error('Error inserting facilities:', error);

                const fetchTime = getISOStringTime();
                const errorMessage = error.message || "Unknown error occurred.";
                lastFacilityFetchInfoStore.getState().setLastFetchInfo(fetchTime, false, null, true, errorMessage);

                console.log("Error Fetch Info: ", {
                    time: lastFacilityFetchInfoStore.getState().lastFetchTime,
                    error: lastFacilityFetchInfoStore.getState().error,
                });
            } finally {
                setIsInserting(false);
            }
        };

        // Trigger facility fetching and saving only if fetching is required
        if (shouldFetch) {
            fetchAndSaveAllFacilities();
        }

    }, [data, shouldFetch]); // Trigger only when data changes or a new fetch is requested

    // Function to trigger manual refetch on button click
    const handleRefetch = () => {
        console.log("Manual refetch triggered");

        // Clear the last fetch info and reset state before triggering the refetch
        lastFacilityFetchInfoStore.getState().clearLastFetchInfo(); // Clear the last fetch info
        console.log("Facility fetch info at clearing: ", lastFacilityFetchInfoStore.getState().lastFetchTime);

        setShouldFetch(true); // Force the fetch to happen by allowing the query to be enabled again
        refetch(); // Trigger the refetch manually
    };

    return {
        isLoading,
        refetchRemote: handleRefetch,
    };
};
