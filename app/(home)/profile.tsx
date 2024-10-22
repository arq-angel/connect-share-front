import React, {useContext, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";
import Toast from "react-native-toast-message";
import {useMutation} from "@tanstack/react-query";
import {postLogout} from "../../api/auth";
import {bearerTokenStore} from "../../store/mmkv/bearerTokenStore";
import {UserLoggedInContext} from "../../context/UserLoggedIn";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const logoutMutation = useMutation({
        mutationFn: postLogout,
        onSuccess: (data) => {
            console.log("Original success response:", data);

            //  clear the stored token
            bearerTokenStore.getState().clearToken();
            console.log("Stored Bearer Token:", bearerTokenStore.getState().token);
            console.log("Stored Token expiration:", bearerTokenStore.getState().expiresAt);

            setIsLoading(false);

            Toast.show({
                type: 'customSuccess',
                props: {
                    text1: 'Logout Successful',
                    text2: 'You have been logged out successfully!.',
                }
            });

            router.replace("/(auth)/login");
        },
        onError: (error) => {
            // Destructure error to get errorMessage if it exists
            let errorMessage = 'An unknown error occurred.';

            // Optionally log the original error for debugging purposes
            console.log('Original error:', error);

            if (error == 'Token Expired.') {
                bearerTokenStore.getState().clearToken();
                errorMessage = 'Token Expired. You have been logged out.';
                router.replace("/(auth)/login");
            }

            setIsLoading(false);
            Toast.show({
                type: 'customError',
                props: {
                    text1: 'Login Failed!',
                    text2: errorMessage,
                }
            });
        }
    });

    const handleLogout = () => {
        console.log("Logout pressed");
        setIsLoading(true);
        logoutMutation.mutate();
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
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/settings")}
                        >
                            <Text className="text-lg font-semibold">Settings</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/help")}
                        >
                            <Text className="text-lg font-semibold">Help Center</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(profile)/privacy")}
                        >
                            <Text className="text-lg font-semibold">Privacy Policy</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.primary}/>
                        </TouchableOpacity>
                        <View className=" items-center justify-center flex-row">
                            <TouchableOpacity
                                onPress={handleLogout}
                                className={`flex-1 mt-5 p-1 rounded-lg justify-center items-center`}
                                style={{
                                    backgroundColor: isLoading ? Colors.primaryMuted : Colors.primary,
                                    borderWidth: 3,
                                    borderColor: isLoading ? Colors.primaryMuted : Colors.primary,
                                }}
                                disabled={isLoading}
                            >
                                <Text
                                    className="font-regular text-white text-2xl">{isLoading ? 'Logging out...' : 'Log Out'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Page;