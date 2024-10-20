import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import {clearEmployeesTable, saveEmployees} from "../../SQLite/employees";
import {createEmployeeTable} from "../../SQLite/Database";
import {lastFetchInfoStore} from "../../store/lastFetchInfoStore";
import {hasBeenMoreThan30Minutes} from "../../Helpers/helpers";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRotate, faFilter} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";

const Page = () => {
    const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
    const token = bearerTokenStore.getState().token;
    const [lastPage, setLastPage] = useState(null);
    const lastFetchTime = lastFetchInfoStore.getState().lastFetchTime;
    console.log("lastFetchTime: ", lastFetchTime);

    console.log("token:", token);

    const fetchAndSaveEmployeesFromAPI = async (page) => {
        try {
            const response = await fetch(
                `https://myapplib.com/api/v1/employees?siteToken=${siteToken}&page=${page}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            const data = await response.json();
            console.log("Data:", data);
            if (data.success & data.data.requests.length > 0) {
                saveEmployees(data.data.requests, page);
                setLastPage(data.data.pagination.lastPage)
            }
        } catch (error) {
            console.log("Error fetching  page:", error);
        }
    }


    const downloadAndSaveAllPages = async () => {
        let currentPage = 1;

        // Fetch the first page and ensure lastPage is set after it completes
        await fetchAndSaveEmployeesFromAPI(currentPage);

        // Check if lastPage has been set correctly after the first page fetch
        if (lastPage) {
            // Increment page count and fetch subsequent pages
            currentPage++;
            while (currentPage <= lastPage) {
                await fetchAndSaveEmployeesFromAPI(currentPage);
                currentPage++;
            }



        } else {
            console.log("Last page information not retrieved. Stopping download.");
        }

    }

    useEffect(() => {
        const shouldRefetch = hasBeenMoreThan30Minutes(lastFetchTime);

        if (shouldRefetch) {
            // createEmployeeTable();
            clearEmployeesTable();
            // downloadAndSaveAllPages();
        } else {
            console.log("Fetch skipped, last fetch was less than 30 minutes ago.");
        }
    }, [lastFetchTime]);

    const refetchEmployees = async () => {
        await clearEmployeesTable();
        console.log("Data cleared, re-fetching new employees...");
        await fetchAndSaveEmployeesFromAPI(1);
    }


    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View className="flex-1 bg-white flex-col">
                <View className="mb-2 px-3 space-x-3 flex-row justify-between items-center">
                    <View className="flex-1">
                        {/*<SearchBar searchTerm="contacts..." searchQuery={searchQuery}*/}
                        {/*           handleTextChange={handleTextChange}/>*/}
                    </View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faFilter} size={20} color={Colors.primary}/>
                    </TouchableOpacity>
                </View>
                <View
                    className="px-3 py-2 border-t-2 border-b-2 border-gray-200 flex-row justify-between items-center">
                    <View className="flex-1">
                        {/*<Text className="text-gray-600">*/}
                        {/*    Showing {allContacts.length} of {data?.pages[0].totalCount} results*/}
                        {/*</Text>*/}
                    </View>
                    <TouchableOpacity
                    >
                        <FontAwesomeIcon icon={faRotate} size={20} color={Colors.primary}/>
                    </TouchableOpacity>
                </View>



                {/*{status === 'pending' && (
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
                                <ContactItem item={item}/>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={() => {
                                console.log("End reached...")
                                if (hasNextPage) {
                                    console.log("Fetching next page...")
                                    fetchNextPage();
                                }
                            }}
                            onEndReachedThreshold={0.1} // Trigger when within 10% of the bottom
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
                )}*/}
            </View>
        </KeyboardAvoidingView>
    );
};

export default Page;