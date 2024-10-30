import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";

const Page = () => {
    const router = useRouter();

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
        </View>
    );
};

export default Page;