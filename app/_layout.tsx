import React, {useEffect, useState} from 'react';
import "@/global.css";
import Toast from "react-native-toast-message";
import {toastConfig} from "@/components/toastConfig";
import {Slot, useRouter} from "expo-router";
import {checkTokenStatus} from "@/utils/auth";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import store, {persistor} from "@/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {useValidateTokenMutation} from "@/hooks/useValidateTokenMutation";
import {ActivityIndicator, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {setRouter} from "@/utils/routerService";


const queryClient = new QueryClient();

const InitialLayout = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRouter(router); // Set the router instance globally
    }, [router]);

    const {mutate: validateToken, status, data, isError, error} = useValidateTokenMutation();
    useEffect(() => {
        const checkToken = async () => {
            try {
                const isValid = await checkTokenStatus();
                console.log("Stored Token status:", isValid);

                if (isValid) {
                    validateToken();
                } else {
                    setIsLoading(false);
                    router.replace("/(auth)/login");
                }
            } catch (error) {
                console.error("Error checking token status:", error);
                setIsLoading(false);
                router.replace("/(auth)/login");
            }
        };

        // Invoke the async token check function
        checkToken();
    }, [validateToken, router]);

    useEffect(() => {
        if (status === "success" && data?.success) {
            console.log("Successfully validated token.");
            console.log("Redirecting to contacts...");
            setIsLoading(false);
            Promise.resolve().then(() => {
                router.replace("/(home)/contacts");
            })
        }
        if (status === "error" && !error?.success) {
            console.log("Token validation unsuccessful.");
            setIsLoading(false);
            Promise.resolve().then(() => {
                router.replace("/(auth)/login");
            })
        }
    }, [status, data, router, error]);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={Colors.myApp.primary}/>
            </View>
        )
    }
    return (
        <Slot/>
    )
}

const RootLayout = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <InitialLayout/>
                    <Toast config={toastConfig}/>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
};

export default RootLayout;