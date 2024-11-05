import React from 'react';
import {Text, View} from "react-native";

const ContactDetailsProfileInfo = ({employee}) => {
    return (
        <>
            {employee && (
                <View>
                    <Text className="font-semibold text-2xl text-gray-800">
                        {employee?.firstName ?? ''} {employee?.middleName ?? ''} {employee?.lastName ?? ''}
                    </Text>
                    <Text className="text-gray-600">{employee.assignments[0]?.jobTitle}</Text>
                </View>
            )}
        </>
    );
};

export default ContactDetailsProfileInfo;