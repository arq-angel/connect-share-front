import React from 'react';
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Call = () => {
    return (
        <SafeAreaView
            edges={["top"]}
        >
            <View className="mx-3">
                <Text>CallPage</Text>
            </View>
        </SafeAreaView>

    );
};

export default Call;