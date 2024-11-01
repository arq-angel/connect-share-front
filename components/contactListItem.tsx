import React from 'react';
import {Text, View} from "react-native";

const ContactListItem = ({item}) => {
    return (
        <View className="flex-col mb-3 border-2 rounded-full p-2 mx-3">
            <View className="flex-row">
                <Text>{item.firstName} {item.middleName} {item.lastName}</Text>
            </View>
            <View className="flex-row">
                <Text>{item.company}</Text>
            </View>
        </View>
    );
};

export default ContactListItem;