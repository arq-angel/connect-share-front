import React from 'react';
import {View, Text, Image, TouchableOpacity} from "react-native";

const ContactItem = ({item, containerStyles}) => {
    return (
        <TouchableOpacity className={`mb-2 mx-3 py-1 border-b border-gray-200 ${containerStyles}`}>
            <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center">
                    {item.image ? (
                        <Image
                            source={{uri: item.image}}
                            className="rounded-full mr-3"
                            style={{height: 50, width: 50}}
                        />
                    ) : (
                        <View className="bg-gray-300 rounded-full mr-3 justify-center items-center" style={{ width: 50, height: 50 }}>
                            <Text className="text-lg font-bold">
                                {`${item.firstName[0]}${item.lastName[0]}`}
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-1 justify-between items-start">
                    <View>
                        <Text className="font-bold text-lg">{item.firstName} {item.middleName} {item.lastName}</Text>
                    </View>
                    <View>
                        {item.assignments && item.assignments.length > 0 && (
                            <View key={0} className="flex-shrink-0">
                                <Text className="text-black font-semibold">
                                    {item.assignments[0].facility ? item.assignments[0].facility : ''}
                                    {item.assignments[0].facility && item.assignments[0].department ? ', ' : ''}
                                    {item.assignments[0].department ? item.assignments[0].department : ''}
                                </Text>
                                <Text className="text-black">
                                    {item.assignments[0].jobTitle ? item.assignments[0].jobTitle : ''}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ContactItem;