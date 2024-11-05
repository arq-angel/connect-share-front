import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Platform, ActivityIndicator, FlatList, KeyboardAvoidingView} from "react-native";
import {useDebounce} from "@/helpers/appHelpers";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchFacilitiesInfiniteQuery} from "@/hooks/useFetchFacilitiesInfiniteQuery";
import TopBar from "@/components/TopBar";
import SecondTopBar from "@/components/SecondTopBar";
import {Colors} from "@/constants/Colors";
import FacilityListItem from "@/components/facility/FacilityListItem";

const Page = () => {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 100); // Debounce search query with a 500ms delay
    const [perPage, setPerPage] = useState(25);
    const [startId, setStartId] = useState(null);
    const [endId, setEndId] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const [allFacilities, setAllFacilities] = useState([]);


    /** Fetch Employees List from remote API start */
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        refetch,
        isLoading,
    } = useFetchFacilitiesInfiniteQuery({perPage, searchQuery: debouncedSearchQuery});

    const handleManualFailitiesFetch = () => {
        queryClient.invalidateQueries(['facilities', "live", "infinite"])
    }

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("Search Query: ", text);
    }

    useEffect(() => {
        if (data && !isLoading) {
            const lastPage = data.pages[data.pages.length - 1];
            const totalItems = lastPage?.data?.pagination?.total;
            setTotalItems(totalItems);

            const facilities = data.pages.flatMap(page => page.data?.requests);
            setAllFacilities(facilities);

            // Set the start and end id as null when no items available
            if (totalItems == 0) {
                setStartId(null);
                setEndId(null);
            }

            console.log("Total items:", totalItems);
            // console.log("All contacts updated:", contacts);
        }
    }, [data, isLoading]);

    useEffect(() => {
        // Fetches when the state of debouncedSearchQuery is changed by adding the text in the search bar
        if (debouncedSearchQuery !== "") {
            refetch();
        }
        // Fetches when the search box is empty after clearing the search box
        if (debouncedSearchQuery === "") {
            refetch();
        }
    }, [debouncedSearchQuery, refetch]);

    /** Fetch Employees List from remote API end */

    const onViewableItemsChanged = useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0].item;
            const lastVisibleItem = viewableItems[viewableItems.length - 1].item;
            setStartId(firstVisibleItem.sequenceId); // assuming your items have an 'id' field
            setEndId(lastVisibleItem.sequenceId); // assuming your items have an 'id' field
            // console.log("First Item:", firstVisibleItem);
        }
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <View className="flex-1 justify-start items-start bg-white">
                {/* Top Bar Start */}
                <TopBar searchTerm="facilities..." searchQuery={searchQuery} handleTextChange={handleTextChange} showFilter={true}/>
                {/* Top Bar End */}

                {/* Second Top Bar Start */}
                <SecondTopBar
                    handleManualFetch={handleManualFailitiesFetch}
                    isRefreshing={(isLoading || isFetching) && !isFetchingNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    startId={startId}
                    endId={endId}
                    totalItems={totalItems}
                />
                {/* Second Top Bar End */}

                {/* FlatList View Start */}
                <View className="flex-row mt-1">
                    <View className="flex-1">
                        {(status === 'pending' || isLoading) && (
                            <View className="flex justify-center items-center mt-3">
                                <ActivityIndicator size="large" color={Colors.myApp.primary}/>
                            </View>
                        )}

                        {status === 'error' && (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'red'}}>Error: {error?.message || 'Something went wrong'}</Text>
                            </View>
                        )}

                        {!isLoading && allFacilities.length > 0 && (
                            <FlatList
                                className="mb-24"
                                data={allFacilities}
                                renderItem={({item}) =>
                                    (
                                        <FacilityListItem item={item}/>
                                    )
                                }
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={() => {
                                    console.log("End reached...")
                                    if (hasNextPage && !isFetchingNextPage && !isFetching) {
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
                                onViewableItemsChanged={onViewableItemsChanged}
                                viewabilityConfig={viewabilityConfig}
                            />
                        )}
                    </View>
                    {/* FlatList View End */}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Page;