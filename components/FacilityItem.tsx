import React from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";

const FacilityItem = ({item, containerStyles}) => {
    return (
        <TouchableOpacity className={`mb-2 mx-3 py-1 border-b border-gray-200 ${containerStyles}`}>
            <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center">
                    {!item.image ? (
                        <Image
                            source={{uri: item.image}}
                            className="rounded-full mr-3"
                            style={{height: 50, width: 50}}
                        />
                    ) : (
                        <View className="rounded-full mr-3 justify-center items-center"
                              style={{width: 50, height: 50, backgroundColor: Colors.primary}}>
                            <Text className="text-lg font-bold text-white">
                                {item.name[0]}{item.name[1]}
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-1 justify-between items-start">
                    <View>
                        <Text className="font-bold text-lg">{item.name}</Text>
                    </View>
                    <View>

                        <View className="flex-shrink-0">
                            <Text className="text-black font-semibold">

                            </Text>
                            <Text className="text-black">

                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FacilityItem;