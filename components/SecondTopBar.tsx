import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "@/constants/Colors";
import {router} from "expo-router";

const SecondTopBar = ({isRefreshing, isFetchingNextPage, handleManualFetch, startId = null, endId = null, totalItems = null}) => {



    return (
        <View className="flex-row border-b-2 border-t-2 border-gray-200">
            <View className="flex-1 flex-row justify-between items-center px-3 py-1.5">
                <View>
                    {/*Here, Show loading more for isFetchingNextPage - implement in the future*/}

                    {isRefreshing ? (
                        <Text className="text-gray-800">Refreshing list...</Text>
                    ) : ( startId == null && endId == null ? (
                            <Text className="text-gray-800">No item available...</Text>
                        ) : (
                            <Text className="text-gray-800">Showing {startId} - {endId} of {totalItems}</Text>
                        )
                    )}

                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Refresh pressed.")
                        handleManualFetch();
                    }}
                    disabled={isRefreshing}
                >
                    {isRefreshing ? (
                        <ActivityIndicator size="small" color={Colors.myApp.primary} />
                    ) : (
                        <FontAwesomeIcon icon={faRefresh} size={20} color={Colors.myApp.primary}/>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SecondTopBar;