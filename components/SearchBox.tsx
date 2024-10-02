import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';

const Page = ({containerStyles, placeholder, searchQuery, setSearchQuery}) => {

    const handleTextChange = (text: string) => {
        setSearchQuery(text);
    }

    return (
        <View
            className={`flex-row items-center justify-center border border-black rounded-full bg-white px-3 ${containerStyles}`}>
            <TextInput
                className="flex-1 text-black py-2"
                placeholder={placeholder}
                placeholderTextColor="#888"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <TouchableOpacity>
                <Ionicons name="search" size={20} color="#888"/>
            </TouchableOpacity>

        </View>
    );
};

export default Page;