import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    TextInput,
    ScrollView,
    Image, Keyboard, TouchableWithoutFeedback, Button, Alert
} from "react-native";
import {UserLoggedInContext} from "../../context/UserLoggedIn";
import {useRouter} from "expo-router";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getProfile, updateProfile} from "../../api/profile";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const Page = () => {
    const {userLoggedIn} = useContext(UserLoggedInContext);
    const token = bearerTokenStore.getState().token;

    const router = useRouter();
    const marginTop = useSafeAreaInsets().top;
    const [isUpdating, setIsUpdating] = useState(false);
    const [newProfileData, setNewProfileData] = useState({
        image: null,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        suburb: '',
        state: '',
        postCode: '',
    });

    // Get the profile details
    const profileQuery = useQuery({
        queryKey: ["profile"],
        enabled: userLoggedIn,
        queryFn: () => getProfile(),
    });
    const profileStatus = profileQuery.status;
    const profileData = profileQuery.data?.data;
    const profileError = profileQuery.error;

    console.log("profileQuery:", profileQuery);

    // Set the profile data into the newProfileData state when profileData is available
    useEffect(() => {
        if (profileData) {
            setNewProfileData({
                image: profileData.image || null,
                firstName: profileData.firstName || '',
                middleName: profileData.middleName || '',
                lastName: profileData.lastName || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
                dateOfBirth: profileData.dateOfBirth || '',
                gender: profileData.gender || '',
                address: profileData.address || '',
                suburb: profileData.suburb || '',
                state: profileData.state || '',
                postCode: profileData.postCode || '',
            });
        }
        console.log("Profile data populated successfully");
    }, [profileData]);

    // Function to handle image selection


    // update the profile details
    // Update the state on input change
    const handleInputChange = (field, value) => {
        setNewProfileData({
            ...newProfileData,
            [field]: value,
        });
    };
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onMutate: () => {
            setIsUpdating(true);
            console.log("Profile update initiated...");
        },
        onSuccess: (data) => {
            console.log("Profile updated successfully:", data);
            profileQuery.refetch();
        },
        onError: (error) => {
            console.error("Failed to update profile:", error.message);
        },
        onSettled: () => {
            setIsUpdating(false);
        }
    });
    const handleSubmit = () => {
        console.log("Submit data:", newProfileData);
        updateProfileMutation.mutate(newProfileData);
    }


    // redirect if not logged in
    useEffect(() => {
        if (!token && !userLoggedIn) {
            console.log('User is not logged in or token is missing, redirecting to login');
            router.replace("/(auth)/login");
        }
    }, [userLoggedIn, token]);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <SafeAreaView className="flex-1 bg-white">
                <ScrollView>
                    {profileStatus === "pending" && (
                        <View style={{padding: 20}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    )}

                    {profileStatus === 'error' && (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'red'}}>Error: {profileError.message || 'Something went wrong'}</Text>
                        </View>
                    )}

                    {profileStatus === 'success' && (
                        <View className="flex-col items-center justify-center">
                            <View className="py-2 relative">
                                {newProfileData.image ? (
                                    <Image
                                        source={{uri: newProfileData.image}}
                                        className="rounded-full"
                                        style={{height: 120, width: 120}}
                                    />
                                ) : (
                                    <View className="bg-gray-300 rounded-full justify-center items-center"
                                          style={{width: 120, height: 120}}>
                                        <Text className="text-4xl">
                                            {`${newProfileData.firstName[0]}${newProfileData.lastName[0]}`}
                                        </Text>
                                    </View>
                                )}
                                <TouchableOpacity className="absolute bottom-3 right-3 bg-blue-600 border border-white rounded-full p-1">
                                    <FontAwesome name="edit" size={14} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row items-start justify-center">
                                <View className="flex-col flex-1 space-y-2">
                                    <View className="flex-row justify-between px-3 space-x-2">
                                        <View className="flex-1">
                                            <Text className="mb-1">First Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={newProfileData.firstName}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('firstName', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Middle Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={newProfileData.middleName}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('middleName', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Last Name</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={newProfileData.lastName}
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
                                                value={newProfileData.email}
                                                className="p-3 text-gray-600"
                                                onChangeText={(value) => handleInputChange('email', value)}
                                            />
                                        </View>
                                    </View>
                                    <View className="px-3">
                                        <Text className="mb-1">Phone</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={newProfileData.phone}
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
                                                    value={newProfileData.dateOfBirth}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">Gender</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={newProfileData.gender}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('gender', value)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View className="px-3">
                                        <Text className="mb-1">Address</Text>
                                        <View className="bg-gray-200 rounded-md">
                                            <TextInput
                                                value={newProfileData.address}
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
                                                    value={newProfileData.suburb}
                                                    className="p-3 text-gray-600"
                                                    onChangeText={(value) => handleInputChange('suburb', value)}
                                                />
                                            </View>
                                        </View>
                                        <View className="flex-1">
                                            <Text className="mb-1">State</Text>
                                            <View className="bg-gray-200 rounded-md">
                                                <TextInput
                                                    value={newProfileData.state}
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
                                                    value={newProfileData.postCode}
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
                                                className={`flex-1 p-3 border-2 rounded-lg justify-center items-center ${isUpdating ? 'bg-blue-400 border-blue-400' : 'bg-blue-600 border-blue-600'}`}
                                                disabled={isUpdating}
                                            >
                                                <Text className="font-bold text-white">{isUpdating ? 'Updating...' : 'Update Profile'}</Text>
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