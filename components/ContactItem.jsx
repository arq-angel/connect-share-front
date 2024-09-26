import React from 'react';
import {View, Text} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


const ContactItem = () => {
    return (
        <View className="flex flex-row space-x-3 pt-1 px-2 items-center bg-green-300">
            <View className="bg-gray-300 p-4 rounded-full">
                <Text><FontAwesome size={24} name="user"/></Text>
            </View>

            <View className="flex-col flex-1 items-start bg-red-400">
                <Text className="text-lg font-bold">Penrith Maintenance Chris</Text>
                <Text className="text-sm text-gray-600">Hardi Aged Care, Maintenance Officer</Text>
            </View>
        </View>
    );
};

export default ContactItem;