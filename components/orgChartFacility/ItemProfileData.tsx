import React from 'react';
import {Text, View} from "react-native";

const ItemProfileData = ({item, type = 'facility'}) => {
    return (
        <>
            {(type == 'facility') && (
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
            )}

            {(type === 'department') && (
                <View className="flex-col">
                    <View className="flex-row">
                        <Text className="text-lg font-semibold text-gray-800">{item?.name}</Text>
                    </View>
                    <View className="flex-col items-start">
                        <Text className="text-gray-800">
                            {item?.shortName}
                        </Text>
                    </View>
                </View>
            )}

            {(type === 'jobTitle') && (
                <View className="flex-col">
                    <View className="flex-row">
                        <Text className="text-lg font-semibold text-gray-800">{item?.title}</Text>
                    </View>
                    <View className="flex-col items-start">
                        <Text className="text-gray-800">
                            {item?.shortTitle}
                        </Text>
                    </View>
                </View>
            )}

            {(type === 'employee') && (
                <View className="flex-col">
                    <View className="flex-row">
                        <Text className="text-lg font-semibold text-gray-800">{
                            item?.firstName ?? ''} {item?.middleName ?? ''} {item?.lastName ?? ''}
                        </Text>
                    </View>
                    <View className="flex-col items-start">
                        <Text className="text-gray-800">

                        </Text>
                    </View>
                </View>
            )}
        </>
    );
};

export default ItemProfileData;