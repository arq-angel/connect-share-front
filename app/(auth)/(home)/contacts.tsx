import React, {useEffect} from 'react';
import {View, Text} from "react-native";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchEmployeesInfiniteQuery} from "@/hooks/useFetchEmployeesInfiniteQuery";

const Page = () => {
    const queryClient = useQueryClient();


    /** Fetch Profile Data from remote API start */
    const {fetch: profileFetch} = useFetchProfileQuery();
    useEffect(() => {
        // this works hand in hand with the axiosConfig where i have invalidated the cache on 401 response - but that needs to be fixed
        queryClient.invalidateQueries(["profile"]);
        profileFetch();
    }, []);
    /** Fetch Profile Data from remote API end */

    /** Fetch Employees List from remote API start */
    const {fetch: employeesFetch, isLoading, isFetchingNextPage} = useFetchEmployeesInfiniteQuery();
    useEffect(() => {
        // queryClient.invalidateQueries(["employees", "live", "infinite"])
        employeesFetch();
    }, []);
    /** Fetch Employees List from remote API start */


    return (
        <View className="flex-1 justify-center items-center">
            <Text>Contacts Page</Text>
            {isLoading && (
                <Text>Loading...</Text>
            )}
            {isFetchingNextPage && (
                <Text>Fetching Next Page...</Text>
            )}
        </View>
    );
};

export default Page;