import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useRouter} from "expo-router";
import Colors from "../../constants/Colors";
import {postLogin} from "../../api/auth";
import {useMutation} from "@tanstack/react-query";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import Toast from "react-native-toast-message";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        deviceName: ""
    });

    const loginMutation = useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            console.log("Original success response:", data);

            // Handle the success case here, like saving the token
            console.log("Token:", data.token);
            console.log("Token Expiration:", data.expiresAt);

            bearerTokenStore.getState().setToken(data.token, data.expiresAt);
            console.log("Stored Bearer Token:", bearerTokenStore.getState().token);
            console.log("Stored Token expiration:", bearerTokenStore.getState().expiresAt);

            setIsLoading(false);

            Toast.show({
                type: 'customSuccess',
                props: {
                    text1: 'Login Successful',
                    text2: 'You have been logged in successfully!.',
                }
            });

            router.replace("/(home)/contacts");
        },
        onError: (error) => {
            // Optionally log the original error for debugging purposes
            console.log('Original error:', error);

            // Destructure error to get errorMessage if it exists
            const errorMessage = 'An unknown error occurred.';

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

    const handleLogin = () => {
        console.log("Login pressed...");
        setIsLoading(true);

        loginMutation.mutate(loginData);
    }

    // set the credentials for ease of development - remove on production
    useEffect(() => {
        setLoginData({
            email: 'john@example.com',
            password: 'password',
            deviceName: 'iOS Emulator'
        })
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 items-center justify-center bg-white">
                <View className="justify-center items-center space-y-6">
                    <View className="flex-col justify-center items-center">
                        <Text className="font-bold text-4xl mb-1" style={{color: Colors.primary}}>Welcome back,</Text>
                        <Text>Please enter your email and password to login.</Text>
                    </View>
                    <View className=" items-center justify-center flex-col space-y-3">
                        <View className=" items-center justify-center flex-row">
                            <TextInput placeholder="Email" value={loginData.email}
                                       className="border-2 flex-1 mx-6 p-3 rounded-lg"
                                       onChangeText={(text) => setLoginData({...loginData, email: text})}/>
                        </View>
                        <View className=" items-center justify-center flex-row">
                            <TextInput placeholder="Password" value={loginData.password} secureTextEntry={true}
                                       className="border-2 flex-1 mx-6 p-3 rounded-lg"
                                       onChangeText={(text) => setLoginData({...loginData, password: text})}/>
                        </View>
                        <View className=" items-center justify-center flex-row">
                            <TouchableOpacity
                                onPress={handleLogin}
                                className={`flex-1 mx-6 p-1 rounded-lg justify-center items-center`}
                                style={{
                                    backgroundColor: isLoading ? Colors.primaryMuted : Colors.primary,
                                    borderWidth: 3,
                                    borderColor: isLoading ? Colors.primaryMuted : Colors.primary,
                                }}
                                disabled={isLoading}
                            >
                                <Text
                                    className="font-regular text-white text-2xl">{isLoading ? 'Logging in...' : 'Log In'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Page;