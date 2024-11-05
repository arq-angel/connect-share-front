import React from 'react';
import {Text, View} from "react-native";

const FacilityDetailProfileInfo = ({facility}) => {
    return (
        <>
            {facility && (
                <View>
                    <Text className="font-semibold text-2xl text-gray-800">
                        {facility?.name}
                    </Text>
                </View>
            )}
        </>
    );
};

export default FacilityDetailProfileInfo;