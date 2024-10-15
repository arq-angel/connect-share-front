import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    ActivityIndicator, Image, TouchableOpacity, ScrollView,
} from "react-native";
import TopBar from "../../components/TopBar";
import {PageHeadingContext} from "../../context/PageHeading";
import SearchBar from "../../components/SearchBar";
import ContactItem from "../../components/ContactItem";
import {useFocusEffect} from "expo-router";
import {getContacts} from "../../api/contact";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import {log} from "expo/build/devtools/logger";
import {all} from "axios";

const Page = () => {
    const {heading, setHeading} = useContext(PageHeadingContext);
    const [search, setSearch] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();

    useFocusEffect(
        useCallback(() => {
            setHeading('Contacts');
            return () => {
            };
        }, [heading])
    );

    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
        isFetching
    } = useInfiniteQuery({
        queryKey: ["contacts", "infinite"],
        getNextPageParam: lastPage => lastPage.nextPage || undefined,
        queryFn: ({pageParam = 1}) => getContacts({
            page: pageParam,
            search,
            perPage: 25 // have to set to 25 otherwise there will be bug where many fetchNextPage will occur by reaching the bottom
        }),
    });

    const handleTextChange = (text) => {
        setSearch(text);
        queryClient.removeQueries(["contacts", "infinite"]);
        if (text === '') {
            queryClient.removeQueries(["contacts", "infinite"]);
            refreshContacts();
        }
        refetch(["contacts", "infinite"]);
    }

    const refreshContacts = async () => {
        setIsRefreshing(true);
        try {
            console.log("Refreshing contacts...");
            // queryClient.removeQueries(["contacts", "infinite"]);
            refetch(["contacts", "infinite"]);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    console.log("status: ", status);
    console.log("isFetching: ", isFetching);

    if (status === "success" && !isFetching) {
        console.log("Data at contact page: ", data.pages);
    }

    const allContacts = data ? data.pages.flatMap(page => page.data) : [];

    // console.log("All contacts: ", allContacts);

    return (
        <View className="bg-white flex-1">
            <SafeAreaView>
                <TopBar/>
                <SearchBar searchTerm="Contacts..." search={search} handleTextChange={handleTextChange}/>

                {status === 'pending' && (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                        <Text>Loading contacts...</Text>
                    </View>
                )}

                {status === 'error' && (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>Error: {error.message || 'Something went wrong'}</Text>
                    </View>
                )}

                {status === 'success' && (
                    <FlatList
                        data={allContacts}
                        renderItem={({item}) => (
                            <ContactItem item={item}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => {
                            console.log("End reached")
                            if (hasNextPage) {
                                fetchNextPage();
                            }
                        }}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() =>
                            isFetchingNextPage ? (
                                <ActivityIndicator size="small" color="#0000ff"/>
                            ) : null
                        }
                        contentContainerStyle={{minHeight: '100%', paddingBottom: 100}}
                        onRefresh={() => {
                            refreshContacts();
                        }}
                        refreshing={isRefreshing}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

export default Page;
