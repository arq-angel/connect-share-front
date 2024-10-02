import {Tabs} from "expo-router";
import TopBar from "../../components/TopBar";
import {SafeAreaView, View, Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default function TabLayout() {

    return (
        <View className="flex-1">
            {/* SafeAreaView only for the top area */}
            <SafeAreaView edges={['top']} className="bg-white">
                <TopBar/>
            </SafeAreaView>
            {/* No gap between TopBar and Tabs */}
            <View className="flex-1">
                <Tabs screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#2f95dc',
                    tabBarInactiveTintColor: 'gray',
                }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: '',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="address-book" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="facilities"
                        options={{
                            title: '',
                            tabBarIcon: ({ color, size }) => (
                                    <FontAwesome name="building" size={size} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </View>
    );
}
