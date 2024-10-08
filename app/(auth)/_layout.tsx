import React, {useContext, useEffect, useState} from 'react';
import {Stack, useRouter} from "expo-router";
import {ActivityIndicator, Text, View} from "react-native";
import {UserLoggedInContext} from "../../context/UserLoggedIn";

const AuthLayout = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const [isLoading, setIsLoading] = useState(true); // Loading state for authentication check
    const router = useRouter();

    useEffect(() => {
        // Simulate authentication check (replace with real logic)
        const checkLoginStatus = async () => {
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
            setUserLoggedIn(false); // Set to true if the user is authenticated
            setIsLoading(false); // Authentication check completed
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (!isLoading && userLoggedIn) {
            router.replace("/(home)/contact"); // Redirect to login if not authenticated
        }
    }, [isLoading, userLoggedIn]);

    // Show a loading screen while authentication is being checked
    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="login" />
        </Stack>
    );
};

export default AuthLayout;