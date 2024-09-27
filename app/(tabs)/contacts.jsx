import React from 'react';
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBox from "../../components/SearchBox";
import ContactItem from "../../components/ContactItem";
import { fetchEmployees } from "../../api/myapplib"; // Ensure this is correct

const Contacts = () => {
    const { data: data, loading, error } = fetchEmployees(); // Destructure data from the custom hook

    return (
        <View className="h-full">
            {/* Contacts header - stays at the top */}
            <View className="flex flex-row items-start px-3">
                <Text className="text-4xl">Contacts</Text>
            </View>
            <View className="flex flex-row items-start px-2 py-1">
                <SearchBox />
            </View>

            {/* ScrollView for All Contacts content */}
            <ScrollView className="flex-1">
                <View>
                    {loading &&
                        (
                            <View className="flex justify-center items-center pt-2">
                                <Text>Loading...</Text>
                            </View>
                        )
                    }
                    {error && <Text>Error: {error.message}</Text>}

                    {/* Render each contact item using the data.requests array */}
                    {data && data.requests && data.requests.map((employee, index) => (
                        <ContactItem key={index} employee={employee} />  // Pass each object to ContactItem
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Contacts;
