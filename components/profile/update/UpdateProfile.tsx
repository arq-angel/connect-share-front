import React from 'react';
import {Text, View} from "react-native";
import UpdateButton from "@/components/profile/update/UpdateButton";

const UpdateProfile = ({profile, handleSubmit, isLoading}) => {
    return (
        <View className="flex-1 flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col p-3">
                        <Text>{JSON.stringify(profile, null, 2)}</Text>
                    </View>
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col h-full p-3">
                        <UpdateButton handleSubmit={handleSubmit} isLoading={isLoading}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default UpdateProfile;