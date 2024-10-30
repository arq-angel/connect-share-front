import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "@/apis/remote/profileAPI";

export const useCachedProfileData = () => {

    const {data, error, isFetching, isLoading} = useQuery({
        queryKey: ["profile"],
        queryFn: getUserProfile,
        enabled: false, // Start as disabled; only fetch on manual trigger
        staleTime: 1000 * 60 * 30, // Set stale time to 30 minutes
    });

    return {
        data,
        error,
        isLoading,
        isFetching,
    }
}