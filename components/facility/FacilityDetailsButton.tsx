import {TouchableOpacity, View, Text} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const FacilityDetailsButton = ({icon, title}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                console.log(`${title} pressed.`)
            }}
        >
            <View className="flex-col justify-center items-center">
                <View className="rounded-full justify-center items-center"
                      style={{width: 50, height: 50, backgroundColor: Colors.myApp.primary}}>
                    <FontAwesomeIcon icon={icon} size={25} color="white"/>
                </View>
                <Text className="text-lg font-bold" style={{color: Colors.myApp.primary}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FacilityDetailsButton;