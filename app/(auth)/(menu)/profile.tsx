import React, {useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import {useCachedProfileData} from "@/hooks/useCachedProfileData";
import Toast from "react-native-toast-message";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "@/constants/Colors";

const Page = () => {

    const {data: profileData, error} = useCachedProfileData();

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "customError",
                props: {
                    text1: "An error occurred",
                    text2: "Something went wrong while displaying your profile. Please close and open the app again!"
                }
            })
        }
        if (profileData) {
            console.log("Data: ", profileData)
        }
    }, [profileData, error]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
            >
                    {error && (
                        <View className="flex-1 flex-col items-center justify-center">
                            <Text className="text-xl text-red-600">An unknown error occurred.</Text>
                            <Text className="text-xl text-red-600">Please close and open the app again!</Text>
                        </View>
                    )}
                {!error && profileData && (
                    <View className="flex-col items-center justify-center">
                        <View className="py-2 relative">
                            {profileData?.data?.image ? (
                                <>
                                    <Image
                                        source={{uri: 'https://myapplib.com/' + profileData?.data?.image}}
                                        className="rounded-full"
                                        style={{height: 120, width: 120}}
                                    />
                                </>

                            ) : (profileData?.data ? (
                                <View className="bg-gray-300 rounded-full justify-center items-center"
                                      style={{width: 120, height: 120}}>
                                    <Text className="text-4xl">
                                        {profileData?.data?.firstName[0]}{profileData?.data?.lastName[0]}
                                    </Text>
                                </View>
                            ) : (
                                <View className="bg-gray-300 rounded-full justify-center items-center"
                                      style={{width: 120, height: 120}}>
                                    <Text className="text-4xl">
                                        <FontAwesomeIcon icon={faUser} size={50}/>
                                    </Text>
                                </View>
                            ))
                            }
                            <TouchableOpacity
                                className="absolute bottom-3 right-3 border border-white rounded-full p-1.5"
                                style={{backgroundColor: Colors.myApp.primary}}>
                                <FontAwesomeIcon icon={faEdit} size={14} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-start justify-center">
                            <View className="flex-col flex-1 space-y-2">
                                <View className="flex-row justify-between space-x-2">
                                    <View className="flex-1">
                                        <Text className="text-lg">First Name</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profileData?.data?.firstName ?? ''}
                                                className="p-3 text-gray-600"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg">Middle Name</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profileData?.data?.middleName ?? ''}
                                                className="p-3 text-gray-600"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg">Last Name</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profileData?.data?.lastName ?? ''}
                                                className="p-3 text-gray-600"
                                            />
                                        </View>
                                    </View>
                                </View>



                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default Page;