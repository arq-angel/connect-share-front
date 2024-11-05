import React from 'react';
import {View, Text} from "react-native";

const FacilityOrgChart = ({facilityOrgChart}) => {
    return (
        <View className="flex-1 felx-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col">
                        <Text>Facility Organizational Chart</Text>
                        {facilityOrgChart && (
                            <Text>{JSON.stringify(facilityOrgChart, null, 2)}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FacilityOrgChart;