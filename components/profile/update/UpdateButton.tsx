import React from 'react';
import {Colors} from "@/constants/Colors";
import {Text, TouchableOpacity} from "react-native";

const UpdateButton = ({isLoading, handleSubmit}) => {
    return (
        <TouchableOpacity
            onPress={handleSubmit}
            className={`p-1 flex items-center justify-center rounded-lg`}
            style={{
                backgroundColor: isLoading ? Colors.myApp.primaryMuted : Colors.myApp.primary,
                borderWidth: 3,
                borderColor: isLoading ? Colors.myApp.primaryMuted : Colors.myApp.primary,
            }}
            disabled={isLoading}
        >
            <Text
                className="font-regular text-white text-2xl">{isLoading ? 'Updating...' : 'Update'}</Text>
        </TouchableOpacity>
    );
};

export default UpdateButton;