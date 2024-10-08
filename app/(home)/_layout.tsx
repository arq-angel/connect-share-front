import React from 'react';
import {Tabs} from "expo-router";

const HomeLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="contact" />
            <Tabs.Screen name="facility" />
        </Tabs>
    );
};

export default HomeLayout;