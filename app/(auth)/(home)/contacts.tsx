import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchEmployeesInfiniteQuery} from "@/hooks/useFetchEmployeesInfiniteQuery";
import {checkIfExpired} from "@/helpers/appHelpers";
import store from "@/redux/store";
import TopBar from "@/components/TopBar";
import SecondTopBar from "@/components/SecondTopBar";

const Page = () => {
    const queryClient = useQueryClient();
    const employeesFetchExpiresAt = store.getState().employeesFetchInfo.expiresAt;
    const [shouldFetch, setShouldFetch] = useState(checkIfExpired(employeesFetchExpiresAt)); // Check expiry on mount so it checks when the page is mounted everytime

    /** Fetch Profile Data from remote API start */
    const {fetch: profileFetch} = useFetchProfileQuery();
    useEffect(() => {
        // this works hand in hand with the axiosConfig where i have invalidated the cache on 401 response - but that needs to be fixed
        queryClient.invalidateQueries(["profile"]);
        profileFetch();
    }, []);
    /** Fetch Profile Data from remote API end */

    /** Fetch Employees List from remote API start */
    const {fetchAllPages, isFetchingNextPage} = useFetchEmployeesInfiniteQuery();
    useEffect(() => {
        // queryClient.invalidateQueries(["employees", "live", "infinite"])
        if (shouldFetch) {
            console.log("Executing fetchAllPages()...")
            fetchAllPages().finally(() => setShouldFetch(false));
        }
    }, [shouldFetch]);
    useEffect(() => {
        if (checkIfExpired(employeesFetchExpiresAt)) {
            console.log("Employee Fetch expired.")
            setShouldFetch(true);
        }
        console.log("Employee Fetch has not expired.")
    }, [employeesFetchExpiresAt]);
    const handleManualEmployeesFetch = () => {
        setShouldFetch(true);
    }
    /** Fetch Employees List from remote API start */


    return (
        <View className="flex-1 justify-start items-start bg-white">
            <TopBar/>
            <SecondTopBar handleManualEmployeesFetch={handleManualEmployeesFetch} isFetching={isFetchingNextPage} />
            <View>

            </View>
        </View>
    );
};

export default Page;