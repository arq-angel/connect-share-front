import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PageDetailsContext} from "../context/PageDetails";

const TopBar = ({containerStyles}) => {
    const {pageTitle} = useContext(PageDetailsContext);

    return (
        <View className={`flex-row justify-between items-center mx-3 space-x-3 ${containerStyles}`}>
            <View className="justify-center items-center">
                <TouchableOpacity>
                    <Ionicons name="menu-outline" size={42} color="#888"/>
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-3xl font-semibold">
                    {pageTitle}
                </Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Ionicons name="person-circle-outline" size={42} color="#888"/>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default TopBar;