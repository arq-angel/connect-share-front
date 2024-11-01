import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl, TextInput} from "react-native";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchEmployeesInfiniteQuery} from "@/hooks/useFetchEmployeesInfiniteQuery";
import {checkIfExpired, useDebounce} from "@/helpers/appHelpers";
import store from "@/redux/store";
import TopBar from "@/components/TopBar";
import SecondTopBar from "@/components/SecondTopBar";
import {useFetchLocalEmployeesInfiniteQuery} from "@/hooks/useFetchLocalEmployeesInfiniteQuery";
import {Colors} from "@/constants/Colors";
import ContactListItem from "@/components/contactListItem";

const Page = () => {
    const queryClient = useQueryClient();
    const employeesFetchExpiresAt = store.getState().employeesFetchInfo.expiresAt;
    const [shouldFetch, setShouldFetch] = useState(checkIfExpired(employeesFetchExpiresAt)); // Check expiry on mount so it checks when the page is mounted everytime
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [perPage, setPerPage] = useState(25);
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce search query with a 500ms delay

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

    /** Fetch Employees List from local API start */
    const {
        data,
        isFetching,
        isFetchingNextPage: isFetchingLocalNextPage,
        hasNextPage,
        status,
        error,
        fetchNextPage,
        refetch: refetchLocal
    } = useFetchLocalEmployeesInfiniteQuery(perPage,debouncedSearchQuery);

    const allContacts = data ? data.pages.flatMap(page => page.data?.employees) : [];

    const handleHardRefresh = async () => {
        setIsRefreshing(true);
        try {
            console.log("Refreshing local contacts...");

            // Clear the query cache for 'employees' and reset to ensure a fresh fetch
            await queryClient.invalidateQueries(['employees', 'local', 'infinite'], { exact: true });
            await queryClient.resetQueries(['employees', 'local', 'infinite'], { exact: true });

            // Refetch only page 1 data with a delay to allow the loading indicator to show
            await refetchLocal({ refetchPage: (_, index) => index === 0 });

            // Add a slight delay to let the loading indicator be visible
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("Search Query: ", text);
    }


    /** Fetch Employees List from local API end */


    return (
        <View className="flex-1 justify-start items-start bg-white">
            {/*<TopBar/>*/}
            <View className="flex-row">
                <View className="flex-1 justify-center items-center p-3">
                    <TextInput
                        placeholder="Search contacts"
                        value={searchQuery}
                        onChangeText={(text) => handleTextChange(text)}
                        className="border-2 border-b-gray-400 w-full p-2 rounded-lg"
                    />
                </View>
            </View>

            <SecondTopBar handleManualEmployeesFetch={handleManualEmployeesFetch} isFetching={isFetchingNextPage}/>
            <View className="flex-row mt-1">
                <View className="flex-1">
                    {status === 'pending' && (
                        <View className="flex justify-center items-center mt-3">
                            <ActivityIndicator size="large" color={Colors.myApp.primary}/>
                        </View>
                    )}

                    {status === 'error' && (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'red'}}>Error: {error?.message || 'Something went wrong'}</Text>
                        </View>
                    )}

                    {status === 'success' && data && (
                        <FlatList
                            className=""
                            data={allContacts}
                            renderItem={({item}) => (
                                <ContactListItem item={item} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={() => {
                                console.log("End reached...")
                                if (hasNextPage) {
                                    console.log("Fetching next page...")
                                    fetchNextPage();
                                }
                            }}
                            onEndReachedThreshold={0.5} // Trigger when within 10% of the bottom
                            ListFooterComponent={() =>
                                isFetchingNextPage ? (
                                    <ActivityIndicator size="large" color={Colors.myApp.primary}/>
                                ) : null
                            }
                            contentContainerStyle={{minHeight: '100%'}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleHardRefresh}
                                    tintColor={Colors.myApp.primary} // Change this to your desired color
                                    colors={[Colors.myApp.primary]} // For Android
                                />
                            }
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default Page;