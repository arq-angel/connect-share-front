import React from 'react';
import {Tabs} from "expo-router";

const HomeLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="contact"
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="facility"
            />
        </Tabs>
    );
};

export default HomeLayout;