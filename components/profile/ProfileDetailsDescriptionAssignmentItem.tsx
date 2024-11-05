import React from 'react';
import {Text, View} from "react-native";
import {Colors} from "@/constants/Colors";

const ProfileDetailsDescriptionAssignmentItem = ({assignment}) => {
    return (
        <View className="flex-row justify-start items-start gap-3 p-3">
            <View className="flex-1">
                <View className="flex-row">
                    <View className="flex-col">
                        <Text className="text-gray-800 font-semibold">Facility: </Text>
                        <Text className="text-gray-800 font-semibold">Department: </Text>
                        <Text className="text-gray-800 font-semibold">Job Title: </Text>
                    </View>
                    <View className="flex-col">
                        <Text className="font-semibold" style={{color: Colors.myApp.primary}}>{assignment.facility}</Text>
                        <Text className="font-semibold" style={{color: Colors.myApp.primary}}>{assignment.department}</Text>
                        <Text className="font-semibold" style={{color: Colors.myApp.primary}}>{assignment.jobTitle}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProfileDetailsDescriptionAssignmentItem;