import React, { useState} from 'react';
import {View, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
import Colors from "../constants/Colors";

const SearchBar = ({searchTerm, search, handleTextChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        // TouchableWithoutFeedback to detect taps outside the input
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="bg-white justify-center items-center pb-2 px-3">
                <TextInput
                    style={{
                        borderWidth: 2,
                        width: '100%',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        borderColor: isFocused || search ? Colors.primary : 'gray', // Dynamic color from Colors object
                    }}
                    placeholder={`Search ${searchTerm || ''}`}
                    onFocus={() => setIsFocused(true)}  // Set focus to true
                    onBlur={() => setIsFocused(false)}   // Set focus to false when focus is lost
                    value={search}
                    onChangeText={(text) => handleTextChange(text)} // Update search query on change
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SearchBar;