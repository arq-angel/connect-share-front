import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from "react-native";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";
import {useLogoutMutation} from "@/hooks/useLogoutMutation";
import {faChevronRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useCachedProfileData} from "@/hooks/useCachedProfileData";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    /** Logout Process start */
    const {mutate: logout, status, data, isError, error} = useLogoutMutation();

    const handleSubmit = () => {
        setIsLoading(true);
        console.log("Log out pressed");
        logout();
    }

    useEffect(() => {
        if (status === "success" && data?.success) {
            console.log("Successfully logged out.");
            console.log("Redirecting to login...");
            Promise.resolve().then(() => {
                setIsLoading(false);
                router.replace("/(auth)/login")
            })
        }
        if (status === "error" && !error?.success) {
            console.log("Log out unsuccessful.");
            setIsLoading(false);
        }
    }, [status, data, router, error])

    /** Logout Process end */

    /** Fetch Cached Profile Data start */
    const {data: profileData} = useCachedProfileData();
    /** Fetch Cached Profile Data end */

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-col items-center justify-center">
                <View className="py-2 relative">
                    {profileData?.data?.image ? (
                        <>
                            <Image
                                source={{uri: 'https://myapplib.com/' + profileData?.data?.image}}
                                className="rounded-full"
                                style={{height: 120, width: 120}}
                            />
                        </>

                    ) : (profileData?.data ? (
                        <View className="bg-gray-300 rounded-full justify-center items-center"
                              style={{width: 120, height: 120}}>
                            <Text className="text-4xl">
                                {profileData?.data?.firstName[0]}{profileData?.data?.lastName[0]}
                            </Text>
                        </View>
                    ) : (
                        <View className="bg-gray-300 rounded-full justify-center items-center"
                              style={{width: 120, height: 120}}>
                            <Text className="text-4xl">
                                <FontAwesomeIcon icon={faUser} size={50}/>
                            </Text>
                        </View>
                    ))
                    }

                </View>
                <View className="mb-3">
                    {profileData?.data && (
                        <Text className="font-semibold text-2xl">
                            {profileData?.data?.firstName ?? ''} {profileData?.data?.middleName ?? ''} {profileData?.data?.lastName ?? ''}
                        </Text>
                    )}
                </View>
                <View className="flex-row px-6">
                    <View className="flex-1 flex-col">
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(menu)/profile")}
                        >
                            <Text className="text-lg font-semibold">Your Profile</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.myApp.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(menu)/settings")}
                        >
                            <Text className="text-lg font-semibold">Settings</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.myApp.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(menu)/help")}
                        >
                            <Text className="text-lg font-semibold">Help Center</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.myApp.primary}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row justify-between items-center py-4 border-b border-gray-400"
                            onPress={() => router.push("/(menu)/privacy")}
                        >
                            <Text className="text-lg font-semibold">Privacy Policy</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.myApp.primary}/>
                        </TouchableOpacity>
                        <View className="flex-col w-full mt-4">
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className={`p-1 flex items-center justify-center rounded-lg`}
                                style={{
                                    backgroundColor: isLoading ? Colors.myApp.primaryMuted : Colors.myApp.primary,
                                    borderWidth: 3,
                                    borderColor: isLoading ? Colors.myApp.primaryMuted : Colors.myApp.primary,
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