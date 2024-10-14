import React, {useCallback, useContext} from 'react';
import {View, ScrollView, SafeAreaView} from "react-native";
import TopBar from "../../components/TopBar";
import {PageHeadingContext} from "../../context/PageHeading";
import {useFocusEffect} from "expo-router";

const Page = () => {
    const {heading, setHeading} = useContext(PageHeadingContext);

    useFocusEffect(
        useCallback(() => {
            setHeading('Facilities');
            return () => {};
        }, [setHeading])
    );

    return (
        <View className="bg-white flex-1">
            <SafeAreaView>
                <TopBar/>
            </SafeAreaView>
            <ScrollView className="bg-white">

            </ScrollView>
        </View>
    );
};

export default Page;