import {View, Text, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import React from "react";
import {useFacilityCache} from "@/hooks/useFacilityCache";
import FacilityDetails from "@/components/FacilityDetails";

const EmployeeDetailsScreen = () => {
    const params = useLocalSearchParams();
    const facilityId = params.id;

    const {facility} = useFacilityCache({facilityId: facilityId});

    return (
        <ScrollView className="flex-1">
            {facility ? (
                <>
                    <FacilityDetails facility={facility}/>
                </>
            ) : (
                <View className="flex-1 flex-col items-center justify-center">
                    <Text className="text-xl text-red-600">Contact details could not be found.</Text>
                    <Text className="text-xl text-red-600">Please close and open the app again!</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default EmployeeDetailsScreen;