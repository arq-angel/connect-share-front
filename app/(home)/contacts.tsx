import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator,
    FlatList, ScrollView, KeyboardAvoidingView, RefreshControl
} from "react-native";
import SearchBar from "../../components/SearchBar";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {getContacts} from "../../api/contact";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFilter, faRotate} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";
import ContactItem from "../../components/ContactItem";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const queryClient = useQueryClient();
    const [allContacts, setAllContacts] = useState([]);

    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["posts", "infinite"],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({pageParam = 1}) => getContacts({
            page: pageParam,
            search: searchQuery,
        }),
    });

    const handleHardRefresh = async () => {
        // Clear existing cached data for the contacts query
        queryClient.setQueryData(["contacts", "infinite"], () => ({
            pages: null,
            pageParams: null,
        }));

        // Invalidate the query to trigger a fresh fetch
        await queryClient.invalidateQueries(["contacts", "infinite"]);
    };

    const handleTextChange = (text) => {
        setSearchQuery(text);
        console.log("handleTextChange");
        handleHardRefresh(); // Trigger a hard refresh when search query changes
    }

    useEffect(() => {
        if (data?.pages[0].data) {
            setAllContacts(prevContacts => [...prevContacts, ...data?.pages[0].data]);
        }
    }, [data])

    console.log(data)

    console.log("All contacts...", allContacts);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View className="flex-1 bg-white flex-col">
                <View className="mb-2 px-3 space-x-3 flex-row justify-between items-center">
                    <View className="flex-1">
                        <SearchBar searchTerm="contacts..." searchQuery={searchQuery}
                                   handleTextChange={handleTextChange}/>
                    </View>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faFilter} size={20} color={Colors.primary}/>
                    </TouchableOpacity>
                </View>
                <View
                    className="px-3 py-2 border-t-2 border-b-2 border-gray-200 flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-gray-600">
                            Showing {allContacts.length} of {data?.pages[0].totalCount} results
                        </Text>
                    </View>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={handleHardRefresh}*/}
                    {/*>*/}
                    {/*    <FontAwesomeIcon icon={faRotate} size={20} color={Colors.primary}/>*/}
                    {/*</TouchableOpacity>*/}
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