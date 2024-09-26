import React from 'react';
import { TextInput, View } from 'react-native';

const SearchBox = () => {
    return (
        <View className="w-full">
            <TextInput
                className="w-full h-10 border border-gray-300 rounded-lg px-4 bg-white"
                placeholder="Search for contacts..."
                placeholderTextColor="#888"
            />
        </View>
    );
};

export default SearchBox;