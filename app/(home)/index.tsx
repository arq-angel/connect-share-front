import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';
import { useContext, useEffect, useState } from "react";
import { PageDetailsContext } from "../../context/PageDetails";
import { useIsFocused } from "@react-navigation/native";
import SearchBox from "../../components/SearchBox";
import { getAllEmployees } from "../../api/employee";
import { UserLoggedInContext } from "../../context/UserLoggedIn";
import ContactItem from "../../components/ContactItem";

export default function Index() {
    const { setPageTitle } = useContext(PageDetailsContext);
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);  // Start with page 1
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // New state for pull-to-refresh
    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({});
    const { userLoggedIn } = useContext(UserLoggedInContext);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        if (isFocused) {
            setPageTitle('Contacts');
        }
    }, [isFocused]);

    const fetchEmployees = async (loadMore = false, refresh = false) => {
        try {
            if ((loading || loadingMore || (refresh && refreshing))) return;  // Prevent loading if already fetching data

            if (loadMore) {
                setLoadingMore(true);
            } else if (refresh) {
                setRefreshing(true);
                setPage(1);  // Reset to the first page on refresh
                setEmployees([]);  // Clear existing data
            } else {
                setLoading(true);
            }

            const response = await getAllEmployees({ searchQuery, page: refresh ? 1 : page });

            if (response.success) {
                console.log('Response:', response);

                // If refreshing, overwrite employees, otherwise append for loadMore
                setEmployees(prevEmployees =>
                    loadMore ? [...prevEmployees, ...response.data.requests] : response.data.requests
                );

                // Update pagination data
                setPagination(response.data.pagination);

                setLoading(false);
                setLoadingMore(false);
                setRefreshing(false);
            } else {
                Alert.alert('Error', response.message || 'Failed to fetch employees');
                setLoading(false);
                setLoadingMore(false);
                setRefreshing(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        if (userLoggedIn) {
            fetchEmployees();
        }
    }, [userLoggedIn, searchQuery]);

    const handleLoadMore = () => {
        if (pagination && pagination.currentPage < pagination.lastPage && !loading && !loadingMore && !refreshing) {
            console.log('Loading more employees...');
            setPage(prevPage => prevPage + 1);  // Increment page number
            fetchEmployees(true);  // Load more employees
        }
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    const handleRefresh = () => {
        if (!refreshing) {
            fetchEmployees(false, true);  // Call fetchEmployees with refresh flag set to true
        }
    };

    return (
        <>
            <View className="bg-white py-2">
                <SearchBox containerStyles={"mx-3 my-2"} placeholder="Search contacts..." searchQuery={searchQuery}
                           setSearchQuery={setSearchQuery} />
                <View className="mx-3 mt-2 h-[1px] bg-gray-500" />
            </View>
            <View className="flex-1 bg-white px-3">
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}  // Bind refreshing state
                            onRefresh={handleRefresh}  // Bind refresh logic
                        />
                    }
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            handleLoadMore();  // Trigger when scrolling close to the bottom
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    {loading && (
                        <View className="flex-row justify-center items-center">
                            <Text>Loading...</Text>
                        </View>
                    )}
                    {!loading && employees && (
                        employees.map((employee, index) => (
                            <ContactItem employee={employee} key={index} />
                        ))
                    )}
                    {loadingMore && (
                        <View className="flex-row justify-center items-center">
                            <Text>Loading more...</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    );
}
