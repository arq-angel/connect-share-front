import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {UserLoggedInContext} from "../context/UserLoggedIn";
import {useRouter} from "expo-router";
import {useLogoutMutation} from "../api/auth";
import {bearerTokenStore} from "../store/bearerTokenStore";

const Page = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const token = bearerTokenStore.getState().token;
    const {clearToken} =bearerTokenStore.getState();

    // verifying token process
    const {mutate, error, data} = useLogoutMutation();
    const handleLogout = () => {
        setIsLoading(true);
        if (!token) {
            // Redirect if no token exists
            console.log("No token found, redirecting to login");
            router.replace("/(auth)/login");
            return;
        }

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

                console.log("Logged out:", data.message);
                clearToken();
                setUserLoggedIn(false);
                setIsLoading(false);
                console.log("Bearer Token after log out:", bearerTokenStore.getState().token);
                router.replace("/(auth)/login");
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
        if (!token || !userLoggedIn) {
            console.log('User is not logged in or token is missing, redirecting to login');
            router.replace("/(auth)/login");
        }
    }, [userLoggedIn, token]);

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="font-bold">Profile Page</Text>
            <View className=" items-center justify-center flex-row">
                <TouchableOpacity
                    onPress={handleLogout}
                    className={`flex-1 mx-6 p-3 rounded-lg justify-center items-center ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                    disabled={isLoading}
                >
                    <Text className="font-bold text-white">{isLoading ? 'Logging out...' : 'Logout'}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default Page;