import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput} from "react-native";
import {useRouter} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useLoginMutation} from "@/hooks/useLoginMutation";

const Page = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        deviceName: "iOS Emulator"
    });
    const [isLoading, setIsLoading] = useState(false);

    const {mutate: login, status, isError, data, error} = useLoginMutation();
    const handleSubmit = () => {
        setIsLoading(true);
        login(loginData);
    }
    useEffect(() => {
        if (status === "success" && data?.success) {
            console.log("Successfully logged in.");
            console.log("Redirecting to contacts...");
            Promise.resolve().then(() => {
                setIsLoading(false);
                router.replace("/(home)/contacts")
            })
        }
        if (status === "error" && !error?.success) {
            console.log("Log in unsuccessful.");
            setIsLoading(false);
        }
    }, [status, data, router, error]);

    useEffect(() => {
        setLoginData({
            email: "john@example.com",
            password: "password",
            deviceName: "iOS Emulator"
        })
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 flex-col items-center justify-center">
                <View className="flex-col w-full justify-between items-center px-8 mb-2">
                    <Text className="font-bold text-5xl" style={{color: Colors.myApp.primary}}>Welcome back,</Text>
                    <Text className="text-lg">Please enter your email and password to login.</Text>
                </View>
                <View className="flex-col w-full px-8 mb-2">
                    <TextInput
                        placeholder="Email"
                        value={loginData.email}
                        onChangeText={(text) => setLoginData({...loginData, email: text})}
                        className="border-2 p-3 rounded-lg w-full text-md mb-2"
                    />
                    <TextInput
                        placeholder="Password"
                        value={loginData.password}
                        onChangeText={(text) => setLoginData({...loginData, password: text})}
                        className="border-2 p-3 rounded-lg w-full text-md"
                    />
                </View>
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
                            className="font-regular text-white text-2xl">{isLoading ? 'Logging in...' : 'Log In'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
};

export default Page;