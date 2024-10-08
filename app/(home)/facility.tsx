import React from 'react';
import {View, Text, ScrollView} from "react-native";
import TopBar from "../../components/TopBar";

const Page = () => {
    return (
        <ScrollView>
            <TopBar />
            <View className="flex-1 justify-center items-center">
                <Text className="font-bold">Facilities Page</Text>
            </View>
        </ScrollView>
    );
};

export default Page;