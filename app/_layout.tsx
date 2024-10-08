import React, {useEffect, useState} from 'react';
import {Stack, useRouter} from "expo-router";
import {ActivityIndicator, View, Text} from "react-native";
import UserLoggedInProvider, {UserLoggedInContext} from "../context/UserLoggedIn";

const InitialLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
    const [isLoading, setIsLoading] = useState(true); // Loading state for authentication check
    const router = useRouter();

    useEffect(() => {
        // Simulate authentication check (replace with real logic)
        const checkLoginStatus = async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
            setIsLoggedIn(false); // Set to true if the user is authenticated
            setIsLoading(false); // Authentication check completed
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.replace("/(auth)/login"); // Redirect to login if not authenticated
        }
    }, [isLoading, isLoggedIn]);

    // Show a loading screen while authentication is being checked
    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <Stack>
            <Stack.Screen
                name="(home)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: true,
                }}
            />
        </Stack>
    );
}

const RootLayout = () => {
    return (
        <UserLoggedInProvider>
            <InitialLayout/>
        </UserLoggedInProvider>
    )
};

export default RootLayout;