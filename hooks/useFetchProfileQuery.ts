import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/apis/remote/profileAPI";

export const useFetchProfileQuery = () => {

    const {data, error, isFetching, status, refetch, isLoading} = useQuery({
        queryKey: ["profile"],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 30, // Set stale time to 30 minutes
        refetchOnWindowFocus: true, // Automatically refetch on window focus if data is stale
        refetchOnMount: true,       // Refetches if data is stale when component mounts
        refetchOnReconnect: true,   // Refetches when the app reconnects to the internet and data is stale
    });

    const handleFetch = () => {
        console.log("Profile fetch triggered.")
        refetch();
    }

    return {
        status,
        data,
        error,
        isLoading,
        isFetching,
        fetch: handleFetch,
    }
}