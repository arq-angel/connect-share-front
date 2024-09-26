import React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import SearchBox from "../../components/SearchBox";
import ContactItem from "../../components/ContactItem";

const contacts = () => {
    const contactItems = Array(20).fill(0);

    return (
        <View className="h-full bg-amber-500">
            {/* Contacts header - stays at the top */}
            <View className="flex flex-row items-start px-3 bg-amber-700">
                <Text className="text-4xl">Contacts</Text>
            </View>
            <View className="flex flex-row items-start px-2 py-1 bg-yellow-400">
                <SearchBox />
            </View>


            {/* ScrollView for All Contacts content */}
            <ScrollView className="flex-1">
                <View>
                    {contactItems.map((_, index) => (
                        <ContactItem key={index} /> // Render ContactItem 20 times
                    ))}

                    {/* Sample contacts (can be replaced with dynamic content) */}
                    {/*<Text>Contact 1</Text>
                    <Text>Contact 2</Text>
                    <Text>Contact 3</Text>
                    <Text>Contact 4</Text>
                    <Text>Contact 5</Text>
                    <Text>Contact 6</Text>
                    <Text>Contact 7</Text>
                    <Text>Contact 8</Text>
                    <Text>Contact 9</Text>
                    <Text>Contact 10</Text>*/}
                    {/* Add more contacts here */}
                </View>
            </ScrollView>
        </View>
    );
};


export default contacts;