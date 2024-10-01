// app/(tabs)/_layout.js
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Index' }} />
            <Tabs.Screen name="facilities" options={{ title: 'Facilities' }} />
        </Tabs>
    );
}
