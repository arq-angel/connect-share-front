import {useQueryClient} from "@tanstack/react-query";

export const useFacilityCache = ({facilityId}) => {
    const queryClient = useQueryClient();

    const cachedData = queryClient.getQueryData(['facilities', "live", "infinite"]);

    const facility = cachedData?.pages
        // .flatMap(page => page.data?.requests || [])
        // .find(fac => fac.id === facilityId);
        .flatMap(page => {
            // console.log("Page: ", page.data.requests);
            return page.data?.requests || [];
        })
        .find(facility => {
            // console.log("Facility: ", facility);
            // console.log("Requested ID: ", facilityId)
            return facility.id == facilityId
        })

    return {
        facility: facility,
    }
}