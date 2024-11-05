import React from 'react';
import {View, Text} from "react-native";

const ContactListItemProfileData = ({item}) => {
    return (
        <View className="flex-col gap-0">
            <View className="flex-row">
                <Text className="text-lg font-semibold text-gray-800">{item.firstName} {item.middleName} {item.lastName}</Text>
            </View>
            <View className="flex-col items-start">
                {item?.assignments?.length > 0 ? (
                    <>
                        <Text className="font-semibold text-gray-600">{item.assignments[0]?.facility}</Text>
                        <Text className="text-gray-600">{item.assignments[0]?.jobTitle}</Text>
                    </>

                ) : (
                    <>
                        {/*<Text className="font-semibold">Facility,</Text>*/}
                        {/*<Text className="">Job Title</Text>*/}
                    </>
                )}

            </View>
        </View>
    );
};

export default ContactListItemProfileData;