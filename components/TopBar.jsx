import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {router} from "expo-router";


const TopBar = ({containerStyles, tabTitle }) => {
    return (
        <View className={`relative flex-row min-h-[50px] justify-between mx-3 items-center ${containerStyles}`}>
            {/* Left-aligned View */}
            <View>
                <Text className="text-blue-500 font-semibold text-xl">Edit</Text>
            </View>

            {/* Center-aligned View */}
            <View className="absolute left-0 right-0 flex items-center">
                <Text className="text-2xl">{tabTitle}</Text>
            </View>

            {/* Right-aligned View */}
            <View className="flex-row items-center space-x-4">
                <TouchableOpacity
                    className="text-blue-500"
                    onPress={() => router.push('/')}
                >
                    <FontAwesome size={20} name="plus" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="text-blue-500"
                    onPress={() => router.push('/')}
                >
                    <FontAwesome size={20} name="tag" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="text-blue-500"
                    onPress={() => router.push('/other/profile')}
                >
                    <FontAwesome size={20} name="user" />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default TopBar;