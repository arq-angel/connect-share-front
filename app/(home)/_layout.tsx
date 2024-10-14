import React from 'react';
import {Tabs} from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";

const HomeLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="contact"
                options={{
                    headerShown: false,
                    tabBarLabel: "", // This removes the title
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome
                            name="address-book"
                            color={focused ? `${Colors.primary}` : "gray"} // Change color based on focus
                            size={focused ? 30 : 25} // Change size based on focus
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="facility"
                options={{
                    headerShown: false,
                    tabBarLabel: "", // This removes the title
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome
                            name="building"
                            color={focused ? `${Colors.primary}` : "gray"} // Change color based on focus
                            size={focused ? 30 : 25} // Change size based on focus
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;