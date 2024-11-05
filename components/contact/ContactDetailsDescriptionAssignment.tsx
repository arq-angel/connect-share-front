import React from 'react';
import {Text, View} from "react-native";
import ProfileDetailsDescriptionAssignmentItem from "@/components/profile/ProfileDetailsDescriptionAssignmentItem";

const ContactDetailsDescriptionAssignment = ({title, assignments}) => {
    return (
        <View className="flex-col justify-start items-start">
            <Text className="text-gray-800 text-xl font-semibold">{title}</Text>
            {assignments.map((assignment, key) => (
                <ProfileDetailsDescriptionAssignmentItem assignment={assignment} key={key} />
            ))}
        </View>
    );
};

export default ContactDetailsDescriptionAssignment;