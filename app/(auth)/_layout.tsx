import React, {useContext, useEffect, useState} from 'react';
import {Stack, useRouter} from "expo-router";
import {UserLoggedInContext} from "../../context/UserLoggedIn";

const AuthLayout = () => {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserLoggedInContext);
    const router = useRouter();

    useEffect(() => {
        if (userLoggedIn) {
            router.replace("/(home)/contact"); // Redirect to login if not authenticated
        }
    }, [userLoggedIn]);

    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default AuthLayout;