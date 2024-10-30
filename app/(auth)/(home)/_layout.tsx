import React from 'react';
import {Tabs} from "expo-router";
import {Colors} from "@/constants/Colors";
import {Text} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBuilding, faAddressBook, faStar, faProjectDiagram, faBars} from "@fortawesome/free-solid-svg-icons";

const HomeLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 90,
                    padding: 10
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
                        color: Colors.myApp.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.myApp.primary : 'gray', fontSize: 13}}>
                            Contacts
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faAddressBook}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.myApp.primary : 'gray'}
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
                        color: Colors.myApp.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.myApp.primary : 'gray', fontSize: 13}}>
                            Facilities
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faBuilding}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.myApp.primary : 'gray'}
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
                        color: Colors.myApp.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.myApp.primary : 'gray', fontSize: 13}}>
                            Org Chart
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faProjectDiagram}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.myApp.primary : 'gray'}
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
                        color: Colors.myApp.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.myApp.primary : 'gray', fontSize: 13}}>
                            Favourites
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faStar}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.myApp.primary : 'gray'}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    headerShown: true,
                    title: 'Menu',
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'semibold',
                        color: Colors.myApp.primary,
                    },
                    tabBarLabel: ({focused}) => (
                        <Text className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}
                              style={{color: focused ? Colors.myApp.primary : 'gray', fontSize: 13}}>
                            Menu
                        </Text>
                    ),
                    tabBarIcon: ({focused}) => (
                        <FontAwesomeIcon icon={faBars}
                                         size={focused ? 25 : 20}
                                         color={focused ? Colors.myApp.primary : 'gray'}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;