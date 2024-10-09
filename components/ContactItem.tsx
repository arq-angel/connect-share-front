import React from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";

const ContactItem = ({item, containerStyles}) => {
    return (
        <TouchableOpacity className={`${containerStyles} bg-white mb-2 rounded-full`}>
            <View className="flex-1 py-1 px-3 flex-row justify-between items-center ">
                <View>
                    <Image
                        source={{uri: item.image}}
                        className="w-12 h-12 rounded-full mr-3"
                    />
                </View>

                <View className="flex-col flex-1 items-start">
                    <View className="flex flex-row items-center space-x-2">
                        <Text className="text-black text-lg font-semibold">
                            {item.firstName} {item.middleName} {item.lastName}
                        </Text>
                    </View>
                    <View className="flex flex-row items-center space-x-2">
                        <Text className="text-black">
                            {item.assignments && item.assignments.map((assignment, key) => {
                                return (
                                    <View key={key} className="flex-shrink-0">
                                        <Text className="text-black font-semibold">
                                            {assignment.facility}, {assignment.department},
                                        </Text>
                                        <Text className="text-black">
                                            {assignment.jobTitle}
                                        </Text>
                                    </View>

                                )
                            })}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ContactItem;