import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";
import {useLogoutMutation} from "@/hooks/useLogoutMutation";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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


    return (
        <View className="flex-1 justify-center items-center">
            <Text>Menu Page</Text>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(menu)/profile");
                }}
            >
                <Text style={{color: Colors.myApp.primary}} className="text-xl">Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(menu)/settings");
                }}
            >
                <Text style={{color: Colors.myApp.primary}} className="text-xl">Go to Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(menu)/help");
                }}
            >
                <Text style={{color: Colors.myApp.primary}} className="text-xl">Go to Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(menu)/privacy");
                }}
            >
                <Text style={{color: Colors.myApp.primary}} className="text-xl">Go to Privacy Policy</Text>
            </TouchableOpacity>
            <View className="flex-col w-full px-8">
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
    );
};

export default Page;