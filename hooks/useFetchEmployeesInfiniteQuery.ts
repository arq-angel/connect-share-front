import {useInfiniteQuery} from "@tanstack/react-query";
import {getEmployeesFromAPI} from "@/apis/remote/employeeAPI";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setInfo} from "@/redux/employeesFetchInfoSlice";
import store from "@/redux/store";
import {getExpiresAtForFetch, getISOStringTime} from "@/helpers/appHelpers";
import {insertEmployeesBatchAPI} from "@/apis/local/employeeAPI";

export const useFetchEmployeesInfiniteQuery = () => {
    const dispatch = useDispatch();
    let fetchInfo = {};

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['employees', "live", "infinite"],
        // queryFn: getEmployeesFromAPI,
        queryFn: getEmployeesFromAPI,
        initialPageParam: 1,
        getNextPageParam: (data, pages) => {
            const nextPage = data?.data?.pagination?.nextPage;
            // console.log("Next Page:", nextPage ?? null);
            return nextPage ?? null;
        },
        enabled: false,
    })

    const fetchAllPages = async () => {
        console.log("Fetch all pages start...");

        try {
            const fetchPage = async (nextPageParam = 1) => {
                const result = await fetchNextPage({pageParam: nextPageParam});
                const newNextPage = result.data?.pages[result.data.pages.length - 1]?.data?.pagination?.nextPage;

                if (newNextPage) {
                    console.log(`Fetching next page...${newNextPage}`);
                    await fetchPage(newNextPage); // Fetch the next page if available
                }
            };

            await fetchPage(); // Start the recursive fetch with the first page
            console.log("All pages fetched.");

            fetchInfo = {
                lastFetchTime: getISOStringTime(),
                wasSuccess: true,
                message: "All employees retrieved successfully.",
                wasError: false,
                error: null,
                expiresAt: getExpiresAtForFetch()
            }
        } catch (error) {
            console.log("Error occurred while fetching employees.", error);
            fetchInfo = {
                lastFetchTime: getISOStringTime(),
                wasSuccess: false,
                message: null,
                wasError: true,
                error: error,
                expiresAt: null,
            }
        } finally {
            console.log("Fetch all pages finished...");

            console.log("Saving the fetch info...")
            dispatch(setInfo(fetchInfo));
            console.log("Saved fetch info:", store.getState().employeesFetchInfo.message);
        }

    };

    useEffect(() => {
        if (data) {
            const latestPageData = data.pages[data.pages.length - 1];
            // console.log("Newly fetched page data:", latestPageData);

            const employees = latestPageData?.data?.requests;
            const currentPage = latestPageData?.data?.pagination?.currentPage;

            try {
                insertEmployeesBatchAPI(employees, currentPage);
            } catch (error) {
                console.log(`Error saving employees of page: ${currentPage}`, error);
            }
        }
    }, [data]);


    return {
        fetchAllPages, // Method to start fetching all pages
        isFetching,
        isFetchingNextPage,
        status,
    };
};
