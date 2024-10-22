import React from 'react';
import {View, Text} from "react-native";
import {useFetchFacilities} from "../../Hooks/useFetchFacilities";

const Page = () => {

    useFetchFacilities();

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Facilities Page</Text>
        </View>
    );
};

export default Page;