import React from 'react';
import {Text, View} from "react-native";
import {Colors} from "@/constants/Colors";

const ContactDetailsDescription = ({title, value}) => {
    return (
        <View className="flex-col justify-start items-start">
            <Text className="text-gray-800 text-xl font-semibold">{title}</Text>
            <Text className="text-lg font-semibold" style={{color: Colors.myApp.primary}}>{value}</Text>
        </View>
    );
};

export default ContactDetailsDescription;