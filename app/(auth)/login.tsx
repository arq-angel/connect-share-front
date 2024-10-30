import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {Colors} from "@/constants/Colors";

const Page = () => {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Login Page</Text>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(home)/contacts");
                }}
            >
                <Text style={{color: Colors.myApp.primary}} className="text-xl">Go to Contacts</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;