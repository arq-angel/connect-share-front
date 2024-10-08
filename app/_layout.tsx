import UserLoggedInProvider from "../context/UserLoggedIn";
import PageDetailsProvider from "../context/PageDetails";
import {router, Stack} from "expo-router";
import {StatusBar} from 'expo-status-bar';
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {View, Text} from "react-native";

const queryClient = new QueryClient();

const InitialLayout = () => {


    return (
        <View>
            <Text>Hello World</Text>
        </View>
    );
}

const RootLayout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserLoggedInProvider>
                <PageDetailsProvider>
                    <InitialLayout/>
                </PageDetailsProvider>
            </UserLoggedInProvider>
        </QueryClientProvider>
    );
};

export default RootLayout;