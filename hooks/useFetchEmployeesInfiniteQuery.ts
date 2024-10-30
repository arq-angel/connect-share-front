import { useInfiniteQuery } from "@tanstack/react-query";
import {getEmployeesFromAPI} from "@/apis/remote/employeeAPI";
import {insertEmployee} from "@/SQLite/employees";
import {setupEmployeesTable} from "@/SQLite/database";
import { useEffect, useState } from "react";
import {getISOStringTime, hasBeenMoreThan30Minutes} from "@/helpers/appHelpers";
import Toast from "react-native-toast-message";

export const useFetchEmployeesInfiniteQuery = () => {
    const [isInserting, setIsInserting] = useState(false);
    const [isDatabaseSetup, setIsDatabaseSetup] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [previousPage, setPreviousPage] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    const isFetchRequired = () => {
        // const lastFetchTime = lastContactFetchInfoStore.getState().lastFetchTime;
        // return hasBeenMoreThan30Minutes(lastFetchTime);
        return true;
    };

    useEffect(() => {
        setShouldFetch(isFetchRequired());
        if (!isFetchRequired()) {
            console.log("Last employees fetch was less than 30 minutes ago. Skipping fetch.");
        }
    }, []);

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
        queryFn: ({ pageParam = 1 }) => getEmployeesFromAPI({ page: pageParam }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.data?.pagination?.nextPage;
            if (nextPage && nextPage !== previousPage) {
                setPreviousPage(nextPage);
                console.log("NextPage: ", nextPage);
            }
            return nextPage || undefined;
        },
        enabled: shouldFetch,
    });

    useEffect(() => {
        const fetchAndSaveEmployees = async () => {
            if (!data || isFetching || isFetchingNextPage || isInserting) return;

            try {
                setIsInserting(true);

                if (!isDatabaseSetup) {
                    console.log("Setting up the local database...");
                    await setupEmployeesTable();
                    setIsDatabaseSetup(true);
                }

                const latestPage = data.pages[data.pages.length - 1];
                const employees = latestPage.data.requests;
                const pageNumber = latestPage.data.pagination.currentPage;
                const lastPage = latestPage.data.pagination.lastPage;

                if (currentPage >= pageNumber) return;
                setCurrentPage(pageNumber);

                console.log(`Processing employees from page ${pageNumber} of ${lastPage}`);

                for (const employee of employees) {
                    await insertEmployee(employee, pageNumber);
                }

                if (pageNumber === lastPage) {
                    console.log("All pages fetched.");
                    const fetchTime = getISOStringTime();
                    Toast.show({
                        type: 'customSuccess',
                        props: {
                            text1: 'Fetched Successfully!',
                            text2: 'Contacts have been successfully updated.',
                        }
                    });
                    setShouldFetch(false); // Stop further fetch attempts
                } else if (hasNextPage && !isFetchingNextPage) {
                    console.log(`Fetching NextPage: ${latestPage.data.pagination.nextPage}`);
                    await fetchNextPage();
                }

            } catch (error) {
                console.error('Error inserting employees:', error);
                const fetchTime = getISOStringTime();
                Toast.show({
                    type: 'error',
                    props: {
                        text1: 'Fetch Error',
                        text2: 'An error occurred while fetching contacts. Please try again later.',
                    }
                });

            } finally {
                setIsInserting(false);
            }
        };

        if (shouldFetch) {
            fetchAndSaveEmployees();
        }

    }, [data, isFetching, isFetchingNextPage, isInserting, shouldFetch]);

    const handleRefetch = () => {
        console.log("Manual refetch triggered");
        setCurrentPage(0);
        setPreviousPage(null);
        setShouldFetch(true);
        refetch();
    };

    return {
        isLoading,
        isFetchingNextPage,
        fetch: handleRefetch,
    };
};
