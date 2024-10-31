import React from 'react';
import {View, Text} from "react-native";

const TopBar = () => {
    return (
        <View className="flex-row">
            <View className="flex-1 justify-center items-center p-3">
                <Text>Top Bar</Text>
            </View>
        </View>
    );
};

export default TopBar;