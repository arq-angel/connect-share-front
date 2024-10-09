import React, {useContext, useEffect, useState} from 'react';
import {Stack, useRouter} from "expo-router";
import {ActivityIndicator, View, Text} from "react-native";
import UserLoggedInProvider, {UserLoggedInContext} from "../context/UserLoggedIn";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useConfirmToken} from "../api/auth";
import {bearerTokenStore} from "../store/bearerTokenStore";

const queryClient = new QueryClient();

const InitialLayout = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const [isLoading, setIsLoading] = useState(true); // Loading state for authentication check
    const router = useRouter();
    const token = bearerTokenStore.getState().token;


    // verifying token process
    const {mutate, error, data} = useConfirmToken();
    const handleTokenVerification = () => {

        // not necessary since empty token sets the validation fail and redirects to login anyway - otherwise redirect before mounting error comes
        /*if (!token) {
            setIsLoading(false);
            // Redirect if no token exists
            console.log("No token found, redirecting to login");
            router.replace("/(auth)/login");
            return;
        }*/

        mutate(token, {
            onSuccess: (data) => {
                // Handle the response here
                // Handle Unauthenticated response
                if (data.message == 'Unauthenticated') {
                    console.log("Unauthenticated:", data.message)
                    setUserLoggedIn(false);
                    setIsLoading(false);
                    router.replace("/(auth)/login");
                }

                console.log("Token Verified:", data.message);
                setUserLoggedIn(true);
                setIsLoading(false);
                router.replace("/(home)/contact");
            },
            onError: (error) => {
                // Handle any errors here
                console.log("Login failed:", error);
                setUserLoggedIn(false);
                setIsLoading(false);
                router.replace("/(auth)/login");
            }
        })
    }

    useEffect(() => {
        handleTokenVerification();
    }, []);

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
        <QueryClientProvider client={queryClient}>
            <UserLoggedInProvider>
                <InitialLayout/>
            </UserLoggedInProvider>
        </QueryClientProvider>
    )
};

export default RootLayout;