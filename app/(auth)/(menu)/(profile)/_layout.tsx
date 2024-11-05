import React from 'react';
import {Stack, useNavigation} from "expo-router";
import {Colors} from "@/constants/Colors";
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const ProfileLayout = () => {
    const navigation = useNavigation();

    return (
        <Stack>
            <Stack.Screen
                name="update"
                options={{
                    headerShown: true,
                    headerTitle: 'Update Profile',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.myApp.primary,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft} size={25} color={Colors.myApp.primary} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
};

export default ProfileLayout;