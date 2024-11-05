import React from 'react';
import {TouchableOpacity, View, Text, Linking} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ContactDetailsButton = ({icon, title, contact}) => {

    const handlePress = () => {
        if (contact?.type === "call" && contact.detail) {
            Linking.openURL(`tel:${contact.detail}`)
                .catch((error: Error) => {
                    console.log("Failed to open phone app", error);
                });
        }

        if (contact?.type === "email" && contact.detail) {
            Linking.openURL(`mailto:${contact.detail}`)
                .catch((error: Error) => {
                    console.log("Failed to open email app", error);
                })
        }

        if (contact?.type === "text" && contact.detail) {
            Linking.openURL(`sms:${contact.detail}`)
                .catch((error: Error) => {
                    console.log("Failed to open messages app", error);
                })
        }

        if (!contact) {
            console.log("Button Pressed. But not contact type and detail provided.")
        }
    }

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View className="flex-col justify-center items-center">
                <View className="rounded-full justify-center items-center"
                      style={{width: 50, height: 50, backgroundColor: Colors.myApp.primary}}>
                    <FontAwesomeIcon icon={icon} size={25} color="white"/>
                </View>
                <Text className="text-lg font-bold" style={{color: Colors.myApp.primary}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ContactDetailsButton;