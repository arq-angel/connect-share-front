import React from 'react';
import {Text, View} from "react-native";

const OrgChartItemProfileData = ({item}) => {
    return (
        <View className="flex-col">
            <View className="flex-row">
                <Text className="text-lg font-semibold text-gray-800">{item?.name}</Text>
            </View>
            <View className="flex-col items-start">
                <Text className="text-gray-800">
                    {item?.address}, {item?.suburb}, {item?.state}, {item?.postCode}
                </Text>
            </View>
        </View>
    );
};

export default OrgChartItemProfileData;