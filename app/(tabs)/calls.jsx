import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'

const calls = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Calls</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default calls;