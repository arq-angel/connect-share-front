import {useInfiniteQuery} from '@tanstack/react-query';
import {getLocalEmployees} from "../api-local/contact";

export const useLocalFetchEmployees = (searchTerm = '') => {
    const {
        status,
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
        initialData: undefined, initialPageParam: undefined,
        queryKey: ['contacts', 'local', searchTerm], // Include search term in the query key
        queryFn: ({ pageParam = 1 }) => getLocalEmployees({ page: pageParam, searchTerm }), // Pass pageParam to fetch each page
        getNextPageParam: (response) => {
            const nextPage = response.data?.data?.pagination.nextPage;
            console.log(nextPage);
            return nextPage ? nextPage : undefined;
        },
        staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
        refetchOnMount: false,     // Disable re-fetching on mount
        keepPreviousData: true // keep old data while fetching new data
    });

    return {
        status,
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetchLocal : refetch, // rename refetch to refetchLocal when returning
    };

};
