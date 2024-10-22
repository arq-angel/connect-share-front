import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';
import {useFetchEmployees} from "../../Hooks/useFetchEmployees";
import {lastContactFetchInfoStore} from "../../store/mmkv/lastContactFetchInfo";
import {hasBeenMoreThan30Minutes} from "../../Helpers/appHelpers";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilter, faRotate} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";
import SearchBar from "../../components/SearchBar";
import {useLocalFetchEmployees} from "../../Hooks/useLocalFetchEmployees";
import ContactItem from "../../components/ContactItem";
import {useQueryClient} from "@tanstack/react-query";
import useDebounce from "../../Hooks/useDebounce";
import {setupDatabaseInstance} from "../../store/SQLite/database";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce search query with a 500ms delay

    /** fetch using remote api start */

    // Fetching logic from the useFetchEmployees hook
    const {refetchRemote} = useFetchEmployees();

    // Check if more than 30 minutes have passed since the last fetch
    const isFetchRequired = () => {
        const lastFetchTime = lastContactFetchInfoStore.getState().lastFetchTime;
        return hasBeenMoreThan30Minutes(lastFetchTime); // Use the helper function to determine if fetch is needed
    };

    useEffect(() => {
        if (isFetchRequired()) {
            refetchRemote(); // Automatically refetch data if needed
        }
    }, []); // Run once on component mount

    const handleManualRefetch = () => {
        console.log("Manual refetch triggered");
        refetchRemote(); // Trigger the manual refetch on button click
    };

    /** fetch using remote api end */

    /** fetch using local api start */

    // Fetching logic from the useLocalFetchEmployees hook
    const { data, error, status, fetchNextPage, hasNextPage, refetchLocal, isFetchingNextPage } = useLocalFetchEmployees(debouncedSearchQuery);

    const allContacts = data ? data.pages.flatMap(page => page.data?.data?.employees) : [];

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("Search Query: ", text);
    }

    const handleHardRefresh = async () => {
        setIsRefreshing(true);
        try {
            console.log("Refreshing local contacts...");

            // tp gracefully show the activity indicator on refresh
            Promise.resolve().then(() => {
                queryClient.removeQueries(["contacts", "local"]);
                refetchLocal(["contacts", "local"]);
            })
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    /** fetch using remote api end */

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View className="flex-1 bg-white flex-col">
                <View className="space-x-2 px-3 my-1 flex-row justify-between items-center">
                    <View className="flex-1">
                        <SearchBar searchTerm="contacts..."
                                   searchQuery={searchQuery}
                                   handleTextChange={handleTextChange}
                                   containerStyles=""
                        />
                    </View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faFilter} size={20} color={Colors.primary}/>
                    </TouchableOpacity>
                </View>
                <View
                    className="px-3 py-1 border-t-2 border-b-2 border-gray-200 flex-row justify-between items-center">
                    <View className="flex-1">
                        {isFetchRequired() ? (
                            <Text className="text-gray-600">Fetching contacts...</Text>
                        ) : (
                            <Text className="text-gray-600">Showing 25 of 501 results</Text>
                        )}
                    </View>
                    {isFetchRequired() ? (
                        <ActivityIndicator size="small" color={Colors.primary}/>
                    ) : (
                        <TouchableOpacity
                            onPress={handleManualRefetch}
                        >
                            <FontAwesomeIcon icon={faRotate} size={20} color={Colors.primary}/>
                        </TouchableOpacity>
                    )}

                </View>


                {status === 'pending' && (
                    <View className="flex justify-center items-center mt-3">
                        <ActivityIndicator size="large" color={Colors.primary}/>
                    </View>
                )}

                {status === 'error' && (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>Error: {error.message || 'Something went wrong'}</Text>
                    </View>
                )}

                {status === 'success' && (
                    <>
                        <FlatList
                            data={allContacts}
                            renderItem={({item}) => (
                                // <ContactItem item={item}/>
                                <></>
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
                                    <ActivityIndicator size="large" color={Colors.primary}/>
                                ) : null
                            }
                            contentContainerStyle={{minHeight: '100%'}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleHardRefresh}
                                    tintColor={Colors.primary} // Change this to your desired color
                                    colors={[Colors.primary]} // For Android
                                />
                            }
                        />
                    </>
                )}
            </View>
        </KeyboardAvoidingView>

    );
};

export default Page;
