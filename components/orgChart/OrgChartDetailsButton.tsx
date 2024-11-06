import {TouchableOpacity, View, Text, Linking, Platform} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useRouter} from "expo-router";

const OrgChartDetailsButton = ({icon, title, contact, size = 50, iconSize = 25}) => {

    const router = useRouter();

    const handlePress = () => {
        if (contact?.type === "call" && contact.detail) {
            Linking.openURL(`tel:${contact.detail}`)
                .catch((error: Error) => {
                    console.log("Failed to open phone app", error);
                });
        }

        if (contact?.type === "email" && contact.detail) {
            Linking.openURL(`mailto:${contact.detail}`)
                .catch((error: Error) => {
                    console.log("Failed to open email app", error);
                })
        }

        if (contact?.type === "map" && contact.detail) {
            const query = encodeURIComponent(contact.detail);
            const url = Platform.OS === 'ios' ? `maps:0,0?q=${query}` : `geo:0,0?q=${query}`;

            Linking.openURL(url)
                .catch((error: Error) => {
                    console.log("Failed to open map app", error);
                });
        }

        if (contact?.type === "chart" && contact.detail) {
            router.push(`/(auth)/orgChartDetails/${contact.detail}`)
        }

        if (!contact) {
            console.log("Button Pressed. But not contact type and detail provided.")
        }
    }

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View className="flex-col justify-center items-center">
                <View className="rounded-full justify-center items-center"
                      style={{width: size, height: size, backgroundColor: Colors.myApp.primary}}>
                    <FontAwesomeIcon icon={icon} size={iconSize} color="white"/>
                </View>
                {/*<Text className="text-lg font-bold" style={{color: Colors.myApp.primary}}>{title}</Text>*/}
            </View>
        </TouchableOpacity>
    );
};

export default OrgChartDetailsButton;