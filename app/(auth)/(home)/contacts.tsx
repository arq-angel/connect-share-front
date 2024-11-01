import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl, TextInput} from "react-native";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchEmployeesInfiniteQuery} from "@/hooks/useFetchEmployeesInfiniteQuery";
import {checkIfExpired, useDebounce} from "@/helpers/appHelpers";
import store from "@/redux/store";
import TopBar from "@/components/TopBar";
import SecondTopBar from "@/components/SecondTopBar";
import {Colors} from "@/constants/Colors";
import ContactListItem from "@/components/contactListItem";

const Page = () => {
    const queryClient = useQueryClient();
    const employeesFetchExpiresAt = store.getState().employeesFetchInfo.expiresAt;
    const [shouldFetch, setShouldFetch] = useState(checkIfExpired(employeesFetchExpiresAt)); // Check expiry on mount so it checks when the page is mounted everytime
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce search query with a 500ms delay
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [perPage, setPerPage] = useState(25);
    const [startId, setStartId] = useState(1);
    const [endId, setEndId] = useState(15);
    const [totalItems, setTotalItems] = useState(501);

    /** Fetch Profile Data from remote API start */
    const {fetch: profileFetch} = useFetchProfileQuery();
    useEffect(() => {
        // this works hand in hand with the axiosConfig where i have invalidated the cache on 401 response - but that needs to be fixed
        queryClient.invalidateQueries(["profile"]);
        profileFetch();
    }, []);
    /** Fetch Profile Data from remote API end */

    /** Fetch Employees List from remote API start */
    const {data, fetchAllPages, isFetchingNextPage, refetch, status} = useFetchEmployeesInfiniteQuery();
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

    const allContacts = data ? data.pages.flatMap(page => page.data?.employees) : [];

    const handleHardRefresh = async () => {
        if (!isFetchingNextPage) { // to prevent hardRefresh while fetching from the database - to prevent caching conflicts in local db fetch
            setIsRefreshing(true);
            try {
                console.log("Refreshing local contacts...");

                // Clear the query cache for 'employees' and reset to ensure a fresh fetch
                await queryClient.invalidateQueries(['employees', 'local', 'infinite'], { exact: true });
                await queryClient.resetQueries(['employees', 'local', 'infinite'], { exact: true });

                // Refetch only page 1 data with a delay to allow the loading indicator to show
                await refetch({ refetchPage: (_, index) => index === 0 });

                // Add a slight delay to let the loading indicator be visible
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                setIsRefreshing(false);
            }
        }
    };

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("Search Query: ", text);
    }

    useEffect(() => {
        if (data) {
            const currentPage = data.pages[data.pages.length - 1];
            const totalItems = currentPage?.data?.pagination.totalEmployees;
            // console.log('Total items: ', totalItems);
            setTotalItems(totalItems);
        }
    }, [data]);

    /** Fetch Employees List from remote API end */

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0].item;
            const lastVisibleItem = viewableItems[viewableItems.length - 1].item;
            setStartId(firstVisibleItem.id); // assuming your items have an 'id' field
            setEndId(lastVisibleItem.id); // assuming your items have an 'id' field
        }
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };


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

            <SecondTopBar
                handleManualEmployeesFetch={handleManualEmployeesFetch}
                isFetching={isFetchingNextPage}
                startId={startId}
                endId={endId}
                totalItems={totalItems}
            />

            <View className="flex-row mt-1">
                <View className="flex-1">

                </View>
            </View>
        </View>
    );
};

export default Page;