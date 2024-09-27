import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const TopBar = () => {
    return (
        <View className="flex-row min-h-[50px] justify-between items-center px-4">
            {/* Left-aligned View */}
            <View>
                <Text className="text-blue-500 font-semibold text-xl">Edit</Text>
            </View>

            {/* Right-aligned View */}
            <View className="flex-row items-center space-x-4">
                <Text className="text-blue-500"><FontAwesome size={20} name="plus"/></Text>
                <Text className="text-blue-500"><FontAwesome size={20} name="tag"/></Text>
                <Text className="text-blue-500"><FontAwesome size={20} name="user"/></Text>
            </View>
        </View>
    );
};

export default TopBar;