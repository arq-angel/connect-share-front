import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {UserLoggedInContext} from "../context/UserLoggedIn";
import {useRouter} from "expo-router";

const Page = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const router = useRouter();

    const handleLogin = () => {
        setUserLoggedIn(false);
    };

    useEffect(() => {
        if (!userLoggedIn) {
            console.log('Login status: ', userLoggedIn); // Logs after state update
            router.replace("/(auth)/login");
        }
    }, [userLoggedIn]);

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="font-bold">Profile Page</Text>
            <TouchableOpacity onPress={handleLogin}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;