import {View, Text, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useEmployeeCache} from "@/hooks/useEmployeeCache";
import ContactDetails from "@/components/contact/ContactDetails";
import React from "react";

const EmployeeDetailsScreen = () => {
    const params = useLocalSearchParams();
    const employeeId = params.id;

    const {employee} = useEmployeeCache({employeeId: employeeId});

    return (
        <ScrollView className="flex-1">
            {employee ? (
                <ContactDetails employee={employee}/>
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