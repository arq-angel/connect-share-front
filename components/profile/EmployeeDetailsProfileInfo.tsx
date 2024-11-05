import React from 'react';
import {Text, View} from "react-native";

const EmployeeDetailsProfileInfo = ({employee}) => {
    return (
        <>
            {employee && (
                <View>
                    <Text className="font-semibold text-2xl text-gray-800">
                        {employee?.firstName} {employee?.middleName} {employee?.lastName}
                    </Text>
                </View>
            )}
        </>
    );
};

export default EmployeeDetailsProfileInfo;