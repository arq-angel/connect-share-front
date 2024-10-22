import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import {useFetchEmployees} from "../../Hooks/useFetchEmployees";
import {lastFetchInfoStore} from "../../store/mmkv/lastFetchInfo";
import {hasBeenMoreThan30Minutes} from "../../Helpers/appHelpers";
import {getEmployeesFromDB} from "../../store/SQLite/employees";

const Page = () => {
    // Fetching logic from the useFetchEmployees hook
    const {isLoading, isFetchingNextPage, refetch} = useFetchEmployees();


    // Check if more than 30 minutes have passed since the last fetch
    const isFetchRequired = () => {
        const lastFetchTime = lastFetchInfoStore.getState().lastFetchTime;
        return hasBeenMoreThan30Minutes(lastFetchTime); // Use the helper function to determine if fetch is needed
    };

    useEffect(() => {
        if (isFetchRequired()) {
            refetch(); // Automatically refetch data if needed
        }
    }, []); // Run once on component mount

    const handleManualRefetch = () => {
        console.log("Manual refetch triggered");
        refetch(); // Trigger the manual refetch on button click
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Contacts Page</Text>

            {isFetchRequired() ? (
                <ActivityIndicator size="large"/>
            ) : (
                <Text>Last fetch was less than 30 minutes ago.</Text>
            )}

            <Button title="Refetch Employees" onPress={handleManualRefetch}/>
        </View>
    );
};

export default Page;
