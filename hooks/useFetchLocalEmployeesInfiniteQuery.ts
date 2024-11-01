import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchPaginatedEmployeesAPI} from "@/apis/local/employeeAPI";
import {useEffect} from "react";

export const useFetchLocalEmployeesInfiniteQuery = (perPage = 25, searchQuery = '') => {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch
    } = useInfiniteQuery({
        initialData: undefined,
        queryKey: ['employees', 'local', 'infinite', searchQuery],
        queryFn: ({pageParam = 1}) => fetchPaginatedEmployeesAPI(perPage, pageParam, searchQuery),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { pagination } = lastPage?.data || {};
            return pagination && pagination.nextPage ? pagination.nextPage : undefined;
        },
        enabled: true
    })

    useEffect(() => {
        if (data) {
            const latestPageData = data.pages[data.pages.length - 1];

            console.log("latest Page: ", latestPageData);
        }
    }, [data])

    return {
        data,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        status,
        error,
        fetchNextPage,
        refetch
    }
};
