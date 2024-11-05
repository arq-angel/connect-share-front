import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const FilterModal = ({setModalVisible}) => {
    const {height} = Dimensions.get("window");

    // Function to handle swipe down gesture
    const onGestureEvent = (event) => {
        console.log("Hello")
        const {translateY} = event.nativeEvent;

        // Close modal if dragged down more than 100 pixels
        if (translateY > 100) {
            console.log("Hello Again")
            setModalVisible(false);
        }
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View className="flex-1 justify-end bg-black/50">
                <View
                    className="w-full bg-white rounded-t-2xl flex-col items-center"
                    style={{height: height * 0.89}} // 0.89 - to just show the page title
                >
                    {/* PanGestureHandler wrapping the horizontal bar */}
                    {/*<PanGestureHandler onGestureEvent={onGestureEvent}>
                        <View className="my-3">
                            <HorizontalBar length={50} thickness={3} color={"gray"}/>
                        </View>
                    </PanGestureHandler>*/}
                    <View className="flex-row">
                        <View className="flex-1 flex-col">
                            <View className="px-3">
                                <Text className="text-lg font-bold mb-2">Filter Options</Text>
                                <Text className="mb-1">Option 1</Text>
                                <Text className="mb-1">Option 2</Text>
                                <Text className="mb-1">Option 3</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Close pressed.");
                            setModalVisible(false)
                        }}
                        className={`p-1 flex items-center justify-center rounded-lg`}
                        style={{
                            backgroundColor: Colors.myApp.primary,
                            borderWidth: 3,
                            borderColor: Colors.myApp.primary,
                        }}
                    >
                        <Text className="font-regular text-white text-2xl">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

export default FilterModal;