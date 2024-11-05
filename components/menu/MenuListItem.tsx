import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "@/constants/Colors";
import {useRouter} from "expo-router";

const MenuListItem = ({route, title}) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            className="flex-row justify-between items-center py-4 border-b border-gray-400"
            onPress={() => router.push(`${route}`)}
        >
            <Text className="text-lg font-semibold">{title}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={25} color={Colors.myApp.primary}/>
        </TouchableOpacity>
    );
};

export default MenuListItem;