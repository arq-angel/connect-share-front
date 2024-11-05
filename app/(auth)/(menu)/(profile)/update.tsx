import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {useCachedProfileData} from "@/hooks/useCachedProfileData";
import Toast from "react-native-toast-message";
import ProfileDetails from "@/components/profile/ProfileDetails";
import UpdateProfile from "@/components/profile/update/UpdateProfile";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

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
            // console.log("Data: ", profileData)
        }
    }, [profileData, error]);

    const handleSubmit = () => {
        console.log("Update Pressed.")
    }

    return (
        <ScrollView className="flex-1">
            {profileData?.data ? (
                <UpdateProfile profile={profileData?.data} handleSubmit={handleSubmit} isLoading={isLoading} />
            ) : (
                <View className="flex-1 flex-col items-center justify-center">
                    <Text className="text-xl text-red-600">Profile details could not be found.</Text>
                    <Text className="text-xl text-red-600">Please close and open the app again!</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default Page;