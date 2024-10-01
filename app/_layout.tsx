import {useEffect, useState} from "react";
import UserLoggedInProvider from "../context/UserLoggedIn";
import { Stack, useRouter } from "expo-router";

const InitialLayout = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setUserLoggedIn(false);

        if (!userLoggedIn) {
            router.replace('/login');
        }
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: true,
                    title: 'Login',
                }}
            />
        </Stack>
    );
}

function checkAuthStatus() {
    // Implement your auth checking logic here
    return Promise.resolve(false);  // Placeholder
}

const RootLayout = () => {
    return (
        <UserLoggedInProvider>
            <InitialLayout />
        </UserLoggedInProvider>
    );
};

export default RootLayout;