import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    KeyboardAvoidingView
} from "react-native";
import {useFetchFacilities} from "../../Hooks/useFetchFacilities";
import {hasBeenMoreThan30Minutes} from "../../Helpers/appHelpers";
import {lastFacilityFetchInfoStore} from "../../store/mmkv/lastFacilityFetchInfo";
import {useQueryClient} from "@tanstack/react-query";
import useDebounce from "../../Hooks/useDebounce";
import SearchBar from "../../components/SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilter, faRotate} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";
import ContactItem from "../../components/ContactItem";
import {useLocalFetchFacilities} from "../../Hooks/useLocalFetchFacilities";
import FacilityItem from "../../components/FacilityItem";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce search query with a 500ms delay
    const [shouldFetch, setShouldFetch] = useState(false);

    /** fetch using remote api start */

        // Fetching logic from the useFetchEmployees hook
    const {refetchRemote} = useFetchFacilities();

    useEffect(() => {
        const checkIfFetchIsRequired = () => {
            const lastFetchTime = lastFacilityFetchInfoStore.getState().lastFetchTime;
            if (lastFetchTime !== null) {
                return hasBeenMoreThan30Minutes(lastFetchTime);
            }
            return true; // Always fetch if no last fetch time
        };

        setShouldFetch(checkIfFetchIsRequired());

        if (checkIfFetchIsRequired()) {
            refetchRemote(); // Automatically refetch data if needed
        }
    }, []); // Run once on component mount

    const handleManualRefetch = () => {
        console.log("Manual refetch triggered");
        refetchRemote(); // Trigger the manual refetch on button click
    };

    /** fetch using remote api end */

    /** fetch using local api start */

        // Fetching logic from the useLocalFetchFacilities hook
    const { data, error, status, refetchLocal } = useLocalFetchFacilities(debouncedSearchQuery);

    const allFacilities = data ? data.data?.data?.facilities : [];

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("Search Query: ", text);
    }

    const handleHardRefresh = async () => {
        setIsRefreshing(true);
        try {
            console.log("Refreshing local contacts...");

            await queryClient.removeQueries(["facilities", "local"]);
            await refetchLocal(); // This should only refetch the local facilities
        } catch (error) {
            console.error("Error fetching facilities:", error);
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
                        {shouldFetch ? (
                            <Text className="text-gray-600">Fetching facilities...</Text>
                        ) : (
                            <Text className="text-gray-600">Showing 25 of 501 results</Text>
                        )}
                    </View>
                    {shouldFetch ? (
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
                        <Text style={{color: 'red'}}>Error: {error?.message || 'Something went wrong'}</Text>
                    </View>
                )}

                {status === 'success' && (
                    <>
                        <FlatList
                            data={allFacilities}
                            renderItem={({item}) => (
                                <FacilityItem item={item}/>
                            )}
                            keyExtractor={(item, index) => index.toString()}
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