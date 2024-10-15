import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import {PageHeadingContext} from "../context/PageHeading";

const TopBar = () => {
    const router = useRouter();
    const {heading, setHeading} = useContext(PageHeadingContext);

    return (
        <View className="flex flex-row justify-between items-center p-3 bg-white">
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl font-semibold">{heading}</Text>
            </View>
            <View className="absolute right-3 justify-center items-center">
                <TouchableOpacity onPress={() => router.push("/(profile)/profileMenu")}>
                    <FontAwesome name="user" size={30} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default TopBar;