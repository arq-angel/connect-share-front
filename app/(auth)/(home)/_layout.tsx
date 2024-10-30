import React from 'react';
import {Tabs} from "expo-router";

const HomeLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="contacts"
            />
            <Tabs.Screen
                name="facilities"
            />
            <Tabs.Screen
                name="orgChart"
            />
            <Tabs.Screen
                name="favourites"
            />
            <Tabs.Screen
                name="menu"
            />
        </Tabs>
    );
};

export default HomeLayout;