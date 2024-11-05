import React, {useState} from 'react';
import {Image, Text, View} from "react-native";

const EmployeeDetailsProfileImage = ({employee}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {employee?.image && !imageError ? (
                <Image
                    source={{uri: 'https://myapplib.com/' + employee?.image}}
                    className="rounded-full"
                    style={{height: 120, width: 120}}
                    onError={() => setImageError(true)}
                />
            ) : (
                <View className="bg-gray-300 rounded-full justify-center items-center"
                      style={{width: 120, height: 120}}>
                    <Text className="text-4xl">
                        {employee?.firstName[0]}{employee?.lastName[1]}
                    </Text>
                </View>
            )
            }
        </>
    );
};

export default EmployeeDetailsProfileImage;