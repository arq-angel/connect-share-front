import React, {useEffect, useState} from 'react';
import "@/global.css";
import Toast from "react-native-toast-message";
import {toastConfig} from "@/components/toastConfig";
import {Slot, useRouter} from "expo-router";
import {checkAuthStatus} from "@/utils/auth";

const InitialLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // check authentication status
        checkAuthStatus().then((auth) => {
          setIsAuthenticated(auth);

            console.log("Auth status: ", auth)

            if (auth) {
                router.replace("/(home)/contacts")
            }

            if (!auth) {
                router.replace("/(auth)/login")
            }

        })
    }, []);


    return (
        <Slot />
    )
}

const RootLayout = () => {
    return (
        <>
            <InitialLayout />
            <Toast
                config={toastConfig}
            />
        </>

    );
};

export default RootLayout;