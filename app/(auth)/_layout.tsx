import React from 'react';
import {Stack, useNavigation} from "expo-router";
import {Colors} from "@/constants/Colors";
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const AuthLayout = () => {
    const navigation = useNavigation();
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(home)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(menu)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="employeeDetails/[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Contact Details',
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
                name="facilityDetails/[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Facility Details',
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
                name="favouriteEmployeeDetails/[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Favourite Contact Details',
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
                name="orgChartDetails/[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Facility Org Chart',
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

export default AuthLayout;