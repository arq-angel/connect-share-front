import {Stack, useNavigation, useRouter} from "expo-router";
import {Colors} from "@/constants/Colors";
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const MenuLayout = () => {
    const navigation = useNavigation();
    const router  = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: true,
                    headerTitle: 'Your Profile',
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
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push("/(profile)/update")}>
                            <FontAwesomeIcon icon={faPenToSquare} size={25} color={Colors.myApp.primary} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="(profile)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: true,
                    headerTitle: 'Settings',
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
            <Stack.Screen
                name="help"
                options={{
                    headerShown: true,
                    headerTitle: 'Help Center',
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
            <Stack.Screen
                name="privacy"
                options={{
                    headerShown: true,
                    headerTitle: 'Privacy Policy',
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

export default MenuLayout;