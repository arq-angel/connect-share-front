import {useInfiniteQuery} from "@tanstack/react-query";
import {getFacilitiesFromAPI} from "@/apis/remote/facilitiesAPI";

export const useFetchFacilitiesInfiniteQuery = ({perPage = 25, searchQuery = ''}) => {
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

        queryKey: ['facilities', "live", "infinite"],
        queryFn: ({pageParam = 1}) => getFacilitiesFromAPI({pageParam, perPage, searchQuery}),
        initialPageParam: 1,
        getNextPageParam: (data, pages) => {
            const nextPage = data?.data?.pagination?.nextPage;
            // console.log("Next Page:", nextPage ?? null);
            return nextPage ?? null;
        },
        enabled: true,
    })

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch,
        isLoading,
    };
};
