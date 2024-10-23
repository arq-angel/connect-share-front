import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    TextInput, ActivityIndicator
} from "react-native";
import {useFetchProfile} from "../../Hooks/useFetchProfile";
import ScrollView = Animated.ScrollView;
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {profileInfo} from "../../store/mmkv/profileInfo";
import Colors from "../../constants/Colors";
import {resolveImageUrl} from "../../Helpers/appHelpers";
import {useUpdateProfile} from "../../Hooks/useUpdateProfile";
import RNPickerSelect from 'react-native-picker-select';

const Page = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [profile, setProfile] = useState({
        firstName: null,
        middleName: null,
        lastName: null,
        image: null,
        email: null,
        phone: null,
        dateOfBirth: null,
        gender: null,
        address: null,
        suburb: null,
        state: null,
        postCode: null,
        country: null,
    });

    /** fetch profile from the api and save into the mmkv storage and retrieve from mmkv storage start */
    const {isFetching, refetch, isSaving, isProfileSaved, isProfileSaveError} = useFetchProfile();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        populateProfile();
    }, [isProfileSaved]);

    console.log("Profile Saved: ", isProfileSaved)

    const populateProfile = () => {

        console.log("Profile firstName: ", profileInfo.getState().firstName);

        setProfile({
            firstName: profileInfo.getState().firstName ?? null,
            middleName: profileInfo.getState().middleName ?? null,
            lastName: profileInfo.getState().lastName ?? null,
            image: profileInfo.getState().image ?? null,
            email: profileInfo.getState().email ?? null,
            phone: profileInfo.getState().phone ?? null,
            dateOfBirth: profileInfo.getState().dateOfBirth ?? null,
            gender: profileInfo.getState().gender ?? null,
            address: profileInfo.getState().address ?? null,
            suburb: profileInfo.getState().suburb ?? null,
            state: profileInfo.getState().state ?? null,
            postCode: profileInfo.getState().postCode ?? null,
            country: profileInfo.getState().country ?? null,
        })
    }

    /** fetch profile from the api and save into the mmkv storage and retrieve from mmkv storage end */

    /** update profile from the api and save into the mmkv storage and retrieve from mmkv storage start */

    const handleInputChange = (key, value) => {
        console.log("Text Change Triggered.")
        setProfile({
            ...profile,
            [key]: value
        })
    }

    const {mutate, isUpdatedProfileSaving, isUpdatedProfileSaveError, isUpdatedProfileSaved} = useUpdateProfile();

    useEffect(() => {
        populateProfile();
    }, [isUpdatedProfileSaved]);

    const handleSubmit = () => {
        console.log("Submit triggered.")
        console.log("profile to be updated: ", profile)
        mutate(profile);
    }

    /** fetch profile from the api and save into the mmkv storage and retrieve from mmkv storage end */

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <SafeAreaView className="flex-1 bg-white">
                <ScrollView>
                    {(isFetching || isSaving) && (
                        <View style={{padding: 20}}>
                            <ActivityIndicator size="large" color={Colors.primary}/>
                        </View>
                    )}

                    {isProfileSaveError && (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'red'}}>Error: Something went wrong</Text>
                        </View>
                    )}

                    {isProfileSaved && (
                        <View className="flex-col items-center justify-center">
                            <View className="py-2 relative">
                                {profile.image ? (
                                    <Image
                                        source={{uri: resolveImageUrl(profile.image)}}
                                        className="rounded-full"
                                        style={{height: 120, width: 120}}
                                    />
                                ) : (
                                    <View className="bg-gray-300 rounded-full justify-center items-center"
                                          style={{width: 120, height: 120}}>
                                        {profile.firstName && profile.lastName ? (
                                            <Text className="text-4xl">
                                                {`${profile.firstName[0]}${profile.lastName[0]}`}
                                            </Text>
                                        ) : (
                                            <Text className="text-4xl">N/A</Text>
                                        )}
                                    </View>
                                )}
                                <TouchableOpacity className="absolute bottom-3 right-3 bg-blue-600 border border-white rounded-full p-1">
                                    <FontAwesomeIcon icon={faEdit} size={14} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row items-start justify-center">
                                <View className="flex-col flex-1 space-y-2">
                                    <View className="flex-row justify-between px-3 space-x-2">
                                        <View className="flex-1">
                                            <Text className="mb-1">First Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.firstName}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('firstName', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Middle Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.middleName}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('middleName', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Last Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.lastName}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('lastName', value)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View className="px-3">
                                        <Text className="mb-1">Email</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profile.email}
                                                className="p-3 text-gray-600"
                                                onChangeText={(value) => handleInputChange('email', value)}
                                            />
                                        </View>
                                    </View>
                                    <View className="px-3">
                                        <Text className="mb-1">Phone</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profile.phone}
                                                className="p-3 text-gray-600"
                                                onChangeText={(value) => handleInputChange('phone', value)}
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between px-3 space-x-2">
                                        <View className="flex-1">
                                            <Text className="mb-1">Date of Birth</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.dateOfBirth}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Gender</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <RNPickerSelect
                                                    onValueChange={(value) => handleInputChange('gender', value)}
                                                    value={profile.gender}
                                                    items={[
                                                        { label: 'Male', value: 'Male' },
                                                        { label: 'Female', value: 'Female' },
                                                        { label: 'Other', value: 'Other' }
                                                    ]}
                                                    style={{
                                                        inputIOS: {
                                                            padding: 12,
                                                            backgroundColor: '#E5E7EB',
                                                            borderRadius: 8,
                                                            color: '#4B5563',
                                                        },
                                                        inputAndroid: {
                                                            padding: 12,
                                                            backgroundColor: '#E5E7EB',
                                                            borderRadius: 8,
                                                            color: '#4B5563',
                                                        }
                                                    }}
                                                    useNativeAndroidPickerStyle={false} // If you want the same style for both platforms
                                                />

                                            </View>
                                        </View>
                                    </View>
                                    <View className="px-3">
                                        <Text className="mb-1">Address</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={profile.address}
                                                className="p-3 text-gray-600"
                                                onChangeText={(value) => handleInputChange('address', value)}
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between px-3 space-x-2">
                                        <View className="flex-1">
                                            <Text className="mb-1">Suburb</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.suburb}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('suburb', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">State</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.state}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('state', value)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between px-3 space-x-2">
                                        <View className="flex-1">
                                            <Text className="mb-1">Post Code</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={profile.postCode}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('postCode', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                        </View>
                                    </View>
                                    <View className="flex-row justify-center items-center px-3">
                                        <TouchableOpacity
                                            onPress={() => {handleSubmit()}}
                                            className={`flex-1 p-1 rounded-lg justify-center items-center`}
                                            style={{
                                                backgroundColor: isUpdating ? Colors.primaryMuted : Colors.primary,
                                                borderWidth: 3,
                                                borderColor: isUpdating ? Colors.primaryMuted : Colors.primary,
                                            }}
                                            disabled={isUpdating || isFetching || isSaving}
                                        >
                                            <Text
                                                className="font-regular text-white text-2xl">{isUpdating ? 'Updating...' : 'Update Profile'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default Page;