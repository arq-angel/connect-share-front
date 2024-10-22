import React, {useState} from 'react';
import {View, TextInput} from "react-native";
import Colors from "../constants/Colors";

const SearchBar = ({searchTerm = '', searchQuery = null, handleTextChange, containerStyles = ''}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={`bg-white justify-center items-center ${containerStyles}`}>
            <TextInput
                style={{borderColor: isFocused || searchQuery ? Colors.primary : Colors.gray}} // Dynamic color from Colors object
                className="border-2 w-full py-2 px-2 rounded-xl"
                placeholder={`Search ${searchTerm || ''}`}
                onFocus={() => setIsFocused(true)}  // Set focus to true
                onBlur={() => setIsFocused(false)}   // Set focus to false when focus is lost
                value={searchQuery}
                onChangeText={(text) => handleTextChange(text)} // Update search query on change
            />
        </View>
    );
};

export default SearchBar;