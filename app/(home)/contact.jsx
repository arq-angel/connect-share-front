import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../../components/SearchBox";
import TopBar from "../../components/TopBar";
import ContactItem from "../../components/ContactItem";

const Contact = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");  // State for search query

    useEffect(() => {
        // Only fetch data when the search query has 3 or more characters
        if (searchQuery.length >= 2 || searchQuery.length === 0) {
            fetchData(1);
        }
    }, [searchQuery]);  // Fetch data whenever the search query changes

    const fetchData = async (nextPage = 1) => {
        // Handle the loading states: don't trigger `loading` if we are refreshing
        if (nextPage === 1 && !refreshing) {
            setLoading(true);
        } else if (nextPage !== 1) {
            setLoadingMore(true);
        }

        let fetchUrl = `https://myapplib.com/api/v1/employees?page=${nextPage}`;

        if (searchQuery) {
            fetchUrl += `&search=${searchQuery}`;
        }

        try {
            const response = await fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const result = await response.json();

            if (!result.success) {
                setError(result.message);
            } else {
                // Ensure that result.data.requests is an array before updating state
                if (result.data && Array.isArray(result.data.requests)) {
                    if (nextPage === 1) {
                        setData(result.data.requests);  // Reset data if it's the first page (for refresh or new search)
                        setLoading(false);  // Always stop loading after the fetch completes
                        setLoadingMore(false);  // Stop loading more after the fetch completes
                        setRefreshing(false);  // Stop refreshing after the fetch completes
                    } else {
                        setData(prevData => [...prevData, ...result.data.requests]);  // Append data for more pages
                    }
                } else {
                    setError("Unexpected data format or empty result");
                }
                setPage(nextPage);
            }
        } catch (err) {
            setError(err.message || 'Error fetching data');
        } finally {
            setLoading(false);  // Always stop loading after the fetch completes
            setLoadingMore(false);  // Stop loading more after the fetch completes
            setRefreshing(false);  // Stop refreshing after the fetch completes
        }
    };

    const handleScroll = ({ nativeEvent }) => {
        const { contentSize, layoutMeasurement, contentOffset } = nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isAtBottom && !loadingMore) {
            fetchData(page + 1);  // Fetch the next page of data when scrolled to the bottom
        }
    };

    // Pull-to-refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);  // Reset to the first page
        fetchData(1);  // Fetch the latest data
    };

    // Update search query based on user input
    const handleSearch = (query) => {
        setSearchQuery(query);
        setPage(1);  // Reset page to 1 for the new search query
    };

    return (
        <>
            <SafeAreaView edges={["top"]}>
                <TopBar tabTitle="Contact" />
            </SafeAreaView>
            <SearchBox
                containerStyles="mx-3 my-1"
                onSearch={handleSearch}  // Pass the search handler to SearchBox
            />
            <ScrollView
                className="mx-3 mt-2"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* Show the main loader only during the initial loading and NOT when refreshing */}
                {loading && !refreshing && (
                    <View className="flex-row justify-center items-center">
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
                {error && (
                    <View className="flex-row justify-center items-center">
                        <Text>{error}</Text>
                    </View>
                )}
                {!loading && data.length > 0 && data.map((employee, index) => (
                    <ContactItem key={index} employee={employee} />
                ))}
                {loadingMore && (
                    <View className="flex-row justify-center items-center">
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                )}
            </ScrollView>
        </>
    );
};

export default Contact;
