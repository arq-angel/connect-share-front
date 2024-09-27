import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

const ContactItem = ({employee}) => {
    return (
        <TouchableOpacity
            className="flex flex-row space-x-3 mb-2 mx-2 items-center"
        >
            {/* Display initials inside a perfect circle */}
            <View style={{ width: 50, height: 50, borderRadius: 25 }} className="bg-gray-300 justify-center items-center">
                <Text className="text-lg font-bold">
                    {`${employee.firstName[0]}${employee.lastName[0]}`}
                </Text>
            </View>

            <View className="flex-col flex-1 items-start">
                <View className="flex flex-row items-center space-x-2">
                    <Text className="text-lg font-bold">{`${employee.department},`}</Text>
                    <Text className="text-lg">{`${employee.firstName} ${employee.middleName} ${employee.lastName}`}</Text>
                </View>

                <Text className="text-sm text-gray-600">{`${employee.company}, ${employee.designation}`}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ContactItem;