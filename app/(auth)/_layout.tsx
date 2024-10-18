import React, {useEffect} from 'react';
import {Stack, useRouter} from "expo-router";
import Colors from "../../constants/Colors";

const AuthLayout = () => {
    const router = useRouter();

    useEffect(() => {
        // router.replace("(home)/contacts")
    }, []);

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