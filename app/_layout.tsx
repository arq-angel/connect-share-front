import UserLoggedInProvider from "../context/UserLoggedIn";
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query";
import PageHeadingProvider from "../context/PageHeading";
import {Stack, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import {toastConfig} from "../components/customToasts";
import {getConfirmToken} from "../api/auth";
import {bearerTokenStore} from "../store/mmkv/bearerTokenStore";
import {View, ActivityIndicator} from "react-native";
import Colors from "../constants/Colors";
import {useFetchEmployees} from "../Hooks/useFetchEmployees";

const queryClient = new QueryClient();

const InitialLayout = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const bearerToken = bearerTokenStore.getState().token;
    const tokenExpiresAt = bearerTokenStore.getState().expiresAt;


    useEffect(() => {
        console.log("Token validation start...")
        console.log("Stored token:", {
            token: bearerToken,
            expiresAt: tokenExpiresAt
        });

        if (bearerToken && tokenExpiresAt) {
            const currentTime = new Date().getTime();
            const tokenExpiryTime = new Date(tokenExpiresAt).getTime();

            if (currentTime < tokenExpiryTime) {
                console.log("Validating Token...");
                confirmTokenMutation.mutate();
            } else {
                console.log("Token has expired.");
                bearerTokenStore.getState().clearToken();
                Toast.show({
                    type: 'customError',
                    props: {
                        text1: 'Session Expired!',
                        text2: 'Please log in again.',
                    }
                });
                Promise.resolve().then(() => {
                    setIsLoading(false);
                    router.push("/(auth)/login");
                });
            }
        } else {
            console.log("Redirecting user to login...")
            Promise.resolve().then(() => {
                setIsLoading(false);
                router.push("/(auth)/login");
            });
        }
    }, []);

    const confirmTokenMutation = useMutation({
        mutationFn: getConfirmToken,
        onSuccess: (data) => {
            console.log("Success response:", data);
            console.log("Redirecting user to contacts...");
            // console.log("Redirecting user to facilities...");

            // Handle state updates and routing after successful token validation
            Promise.resolve().then(() => {
                setIsLoading(false);
                // router.replace("/(home)/contacts");
                // router.replace("/(home)/facilities");
                router.replace("/(profile)/editProfile");
            });
        },
        onError: (error) => {
            console.log("Original error:", error);

            // Extract error message from the new error format structure
            let errorMessage = error.message || 'An unknown error occurred. Please login again.';

            // Handle specific case for token expiration
            if (errorMessage === 'Unauthorized.') {
                bearerTokenStore.getState().clearToken();
                errorMessage = 'Token Expired. You have been logged out.';

                Toast.show({
                    type: 'customError',
                    props: {
                        text1: 'Login Failed!',
                        text2: errorMessage,
                    }
                });

                // Redirect to login page after token expiration
                Promise.resolve().then(() => {
                    setIsLoading(false);
                    router.push("/(auth)/login");
                });
            } else {
                console.log("Unhandled error:", errorMessage);

                // Display a toast for unhandled errors using the returned error message
                Toast.show({
                    type: 'customError',
                    props: {
                        text1: 'Login Failed!',
                        text2: errorMessage,  // Use the error message from the errorFormat structure
                    }
                });

                // Redirect to login page on other errors
                Promise.resolve().then(() => {
                    setIsLoading(false);
                    router.push("/(auth)/login");
                });
            }
        }
    });


    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
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
                name="(profile)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}

const RootLayout = () => {


    return (
        <QueryClientProvider client={queryClient}>
            <UserLoggedInProvider>
                <PageHeadingProvider>
                    <InitialLayout/>
                </PageHeadingProvider>
            </UserLoggedInProvider>
            {/* Add the Toast component here */}
            <Toast
                config={toastConfig}
            />
        </QueryClientProvider>
    )
};

export default RootLayout;