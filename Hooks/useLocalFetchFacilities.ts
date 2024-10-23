import {useQuery} from '@tanstack/react-query';
import {getLocalFacilities} from "../api-local/facility";

export const useLocalFetchFacilities = (searchTerm = '') => {
    const {
        status,
        data,
        error,
        isFetching,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        initialData: undefined, initialPageParam: undefined,
        queryKey: ['facilities', 'local', searchTerm], // Include search term in the query key
        queryFn: ({ queryKey }) => getLocalFacilities({ searchTerm: queryKey[2] }), // Dynamically pass the searchTerm from queryKey
        staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
        refetchOnMount: false,     // Disable re-fetching on mount
        keepPreviousData: true // keep old data while fetching new data
    });

    return {
        status,
        data,
        error,
        isLoading,
        isFetching,
        refetchLocal: refetch, // rename refetch to refetchLocal when returning
    };

};
