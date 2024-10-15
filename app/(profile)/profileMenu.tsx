import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {router} from "expo-router";
import {UserLoggedInContext} from "../../context/UserLoggedIn";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import {useLogoutMutation} from "../../api/auth";


const Page = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const [isLoading, setIsLoading] = useState(false);
    const token = bearerTokenStore.getState().token;
    const {clearToken} = bearerTokenStore.getState();

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

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-col items-center justify-center">
                <View className="py-2 relative">
                    <View className="bg-gray-300 rounded-full justify-center items-center"
                          style={{width: 120, height: 120}}>
                        <Text className="text-4xl">
                            {`AB`}
                        </Text>
                    </View>
                </View>
                <View className="mb-3">
                    <Text className="font-semibold text-xl">Test User</Text>
                </View>
                <View className="flex-row px-6">
                    <View className="flex-1 flex-col">
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/editProfile")}
                        >
                            <Text className="text-lg font-semibold">Your Profile</Text>
                            <FontAwesome name="chevron-right" size={20} color="#6777ef"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/settings")}
                        >
                            <Text className="text-lg font-semibold">Settings</Text>
                            <FontAwesome name="chevron-right" size={20} color="#6777ef"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/help")}
                        >
                            <Text className="text-lg font-semibold">Help Center</Text>
                            <FontAwesome name="chevron-right" size={20} color="#6777ef"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/privacy")}
                        >
                            <Text className="text-lg font-semibold">Privacy Policy</Text>
                            <FontAwesome name="chevron-right" size={20} color="#6777ef"/>
                        </TouchableOpacity>


                        <View className="flex-row justify-center items-center py-4">
                            <TouchableOpacity
                                onPress={handleLogout}
                                className={`flex-1 p-3 border-2 rounded-lg justify-center items-center ${isLoading ? 'bg-blue-400 border-blue-400' : 'bg-blue-600 border-blue-600'}`}
                                disabled={isLoading}
                            >
                                <Text className="font-bold text-white">{isLoading ? 'Logging out...' : 'Log Out'}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Page;