import React from 'react';
import {Tabs} from "expo-router";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAddressBook, faBuilding, faProjectDiagram, faStar, faUserTie} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../constants/Colors";
import {Text} from "react-native";

const HomeLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 90,
                    padding: 10,
                }
            }}
        >
            <Tabs.Screen
                name="contacts"
                options={{
                    headerShown: true,
                    title: 'Contacts',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-bold' : 'font-normal'}`}
                              style={{color: focused ? Colors.primary : 'gray'}}
                        >
                            Contacts
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faAddressBook}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.primary : 'gray'}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="facilities"
                options={{
                    headerShown: true,
                    title: 'Facilities',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.primary : 'gray'}}
                        >
                            Facilities
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faBuilding}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.primary : 'gray'}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="orgChart"
                options={{
                    headerShown: true,
                    title: 'Org Chart',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.primary : 'gray'}}
                        >
                            Org Chart
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faProjectDiagram}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.primary : 'gray'}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="favourites"
                options={{
                    headerShown: true,
                    title: 'Favourites',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.primary : 'gray'}}
                        >
                            Favourites
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faStar}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.primary : 'gray'}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: true,
                    title: 'Profile',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.primary : 'gray'}}
                        >
                            Profile
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faUserTie}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.primary : 'gray'}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;