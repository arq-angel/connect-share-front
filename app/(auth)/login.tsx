import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback} from "react-native";
import {UserLoggedInContext} from "../../context/UserLoggedIn";
import {useRouter} from "expo-router";
import {useLoginMutation} from "../../api/auth";
import {bearerTokenStore} from "../../store/bearerTokenStore";

const Page = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        deviceName: ""
    });

    // login process
    const { mutate, error, data } = useLoginMutation();
    const handleLogin = () => {
        console.log("Login Data: ", loginData);
        setIsLoading(true);
        mutate(loginData, {
            onSuccess: (data) => {
                // Handle the success case here, like saving the token
                console.log("Token:", data.token);
                console.log("Token Expiration:", data.expiresAt);

                bearerTokenStore.getState().setToken(data.token, data.expiresAt);
                setUserLoggedIn(true);
                setIsLoading(false);

                console.log("Stored Bearer Token:", bearerTokenStore.getState().token);
                console.log("Stored Token expiration:", bearerTokenStore.getState().expiresAt);
            },
            onError: (err) => {
                console.error("Login failed:", err);
                setUserLoggedIn(false);
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        console.log("Checking user logged in, userLoggedIn:", userLoggedIn);
        if (userLoggedIn) {
            console.log('Login status: ', userLoggedIn); // Logs after state update
            router.replace("/(home)/contact");
        }
    }, [userLoggedIn]);

    useEffect(() => {
        setLoginData({
            email: "john@example.com",
            password: "password",
            deviceName: "iOS Emulator"
        })
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="justify-center items-center space-y-6">
                <View className="flex-col justify-center items-center">
                    <Text className="font-bold text-4xl mb-1 text-blue-600">Welcome back,</Text>
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
                            className={`flex-1 mx-6 p-3 border-2 rounded-lg justify-center items-center ${isLoading ? 'bg-blue-400 border-blue-400' : 'bg-blue-600 border-blue-600'}`}
                            disabled={isLoading}
                        >
                            <Text className="font-bold text-white">{isLoading ? 'Logging in...' : 'Login'}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>

    );
};

export default Page;
