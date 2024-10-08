import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

const TopBar = () => {
    const router = useRouter();

    return (
        <View className="flex flex-row justify-between items-center p-3">
            <TouchableOpacity onPress={() => router.push("/settings")}>
                <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/profile")}>
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TopBar;