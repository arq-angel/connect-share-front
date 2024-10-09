import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator, SafeAreaView} from "react-native";
import TopBar from "../../components/TopBar";
import {useFetchEmployees} from "../../api/contact";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import ContactItem from "../../components/ContactItem";
import {PageHeadingContext} from "../../context/PageHeading";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [queryParams, setQueryParams] = useState({
        search: '',
        page: 1,
        perPage: 15,
    });
    const {heading, setHeading} = useContext(PageHeadingContext);

    // fetch employees
    const {mutate, error, data} = useFetchEmployees();
    const handleFetchEmployees = () => {
        setIsLoading(true);

        const requestData = {
            token: bearerTokenStore.getState().token,
            queryParams: queryParams,
        }

        mutate(requestData, {
            onSuccess: (data) => {
                if (!data.success) {
                    console.log("Fetch returned with error:", data.message)
                    setIsLoading(false);
                }
                setIsLoading(false);
                console.log('Fetched Data: ', data);
            },
            onError: (error) => {
                // Handle any errors here
                console.log("Employee data fetch failed:", error);
                setIsLoading(false);
            }
        })
    }

    useEffect(() => {
        if (!isLoading) {
            handleFetchEmployees();
        }
        setHeading('Contacts');
    }, [])


    return (
        <View>
            <SafeAreaView>
                <TopBar/>
            </SafeAreaView>
            <ScrollView className="bg-white">

                {isLoading && (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#0000ff"/>
                        <Text>Loading...</Text>
                    </View>
                )}
                {!isLoading && data && (
                    <View className="flex-1 justify-center px-3 pt-2 flex-col bg-gray-200">

                        {/*<Text>{JSON.stringify(data.data, null, 2)}</Text>*/}
                        {data.data.map((item, key)=> {
                            return (
                                <ContactItem key={key} item={item} />
                            )
                        })}
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

export default Page;