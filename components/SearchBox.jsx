import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const SearchBox = ({ containerStyles, onSearch }) => {
    const [query, setQuery] = useState(null);  // State to manage the search input

    const handleInputChange = (text) => {
        setQuery(text);
        if (onSearch) {
            onSearch(text);  // Pass the query back to the parent component
        }
    };

    return (
        <View className={`${containerStyles}`}>
            <TextInput
                className="w-full h-10 border border-gray-300 rounded-lg px-4 bg-white"
                value={query}
                onChangeText={handleInputChange}
                placeholder="Search for contacts..."
                placeholderTextColor="#888"
            />
        </View>
    );
};

export default SearchBox;
