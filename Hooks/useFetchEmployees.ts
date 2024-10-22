import {useInfiniteQuery} from "@tanstack/react-query";
import {getEmployeesFromAPI} from "../api/contact";
import {lastFetchInfoStore} from "../store/mmkv/lastFetchInfo";
import {createEmployeeTable} from "../store/SQLite/database";

export const useFetchEmployees = () => {
    console.log("Fetching the employees list...")

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
        queryKey: ['employees', 'infinite'],
        queryFn: ({ pageParam = 1 }) => getEmployeesFromAPI({ page: pageParam }), // Pass pageParam to fetch each page
        getNextPageParam: pages  => {
            const nextPage = pages.data?.pagination?.nextPage;
            return nextPage ? nextPage : undefined;
        },
    });

    // Perform actions when data is fetched successfully
    if (data) {
        console.log("Logging the fetched employees list...");
        console.log("Data: ", data.pages[0].data);

        try {
            createEmployeeTable();
        } catch (error) {
            console.log(error);
        }

        // console.log("Saving the fetch info...");
        // const fetchTime = new Date().toLocaleString();
        // const fetchMessage = data?.message || "Employees retrieved successfully.";
        // lastFetchInfoStore.getState().setLastFetchInfo(fetchTime, true, fetchMessage, false, null);
    }

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    };


}
