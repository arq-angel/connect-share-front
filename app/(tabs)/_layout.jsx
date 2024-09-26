import React from 'react';
import {Tabs} from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TopBar from "../../components/TopBar";
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

const TabLayout = () => {
    return (
        <View className="flex-1 bg-yellow-800">
            {/* SafeAreaView only for TopBar */}
            <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
                <TopBar />
            </SafeAreaView>

            {/* Tabs below the TopBar */}
            <Tabs className="flex-1 p-4">
                <Tabs.Screen
                    name="contacts"
                    options={{
                        title: 'Contacts',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="address-book" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="calls"
                    options={{
                        title: 'Calls',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="phone" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
};


export default TabLayout;