import {Stack} from "expo-router";
import React from "react";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(home)"
                options={{
                    headerShown: false,
                    title: "Home",
                }}/>
            <Stack.Screen
                name="other/profile"
                options={{
                    title: "Profile",
                }}
            />
        </Stack>
    );
};

export default RootLayout;