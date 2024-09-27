import React from 'react';
import {Tabs} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HomeLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="contact"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <FontAwesome size={28} name="address-book" color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="call"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <FontAwesome size={28} name="phone" color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;