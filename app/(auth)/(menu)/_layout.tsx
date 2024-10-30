import React from 'react';
import {Stack} from "expo-router";

const MenuLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="profile"
            />
        </Stack>
    );
};

export default MenuLayout;