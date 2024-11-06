import {useQuery} from "@tanstack/react-query";
import {getOrgChartFromAPI} from "@/apis/remote/orgChartAPI";

export const useFetchFacilityOrgChart = (facilityId = null) => {

    const {data, error, isFetching, status, refetch, isLoading} = useQuery({
        queryKey: ["orgChart", facilityId],
        queryFn: (() => getOrgChartFromAPI(facilityId)),
        staleTime: 1000 * 60 * 30, // Set stale time to 30 minutes
        refetchOnWindowFocus: true, // Automatically refetch on window focus if data is stale
        refetchOnMount: true,       // Refetches if data is stale when component mounts
        refetchOnReconnect: true,   // Refetches when the app reconnects to the internet and data is stale
    });

    const handleFetch = () => {
        console.log("Facility organization chart fetch triggered.")
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