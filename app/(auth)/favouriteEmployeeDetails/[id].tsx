import {View, Text, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useEmployeeCache} from "@/hooks/useEmployeeCache";
import ContactDetails from "@/components/contact/ContactDetails";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const EmployeeDetailsScreen = () => {
    const params = useLocalSearchParams();
    const favouriteEmployeeId = params.id;
    const [favouriteEmployee, setFavouriteEmployee] = useState(null);

    const contacts = useSelector((state: RootState) => state.favouriteContacts.contacts);

    useEffect(() => {
        // console.log("favouriteContacts: ", contacts);
        const employeeDetails = contacts.some((contact) => {
            if (contact.id == favouriteEmployeeId) {
                setFavouriteEmployee(contact);
            }
        })
    }, [contacts]);

    return (
        <ScrollView className="flex-1">
            {favouriteEmployee ? (
                <ContactDetails employee={favouriteEmployee}/>
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