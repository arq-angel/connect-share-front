import {TouchableOpacity, View} from "react-native";
import FacilityListItemProfileImage from "@/components/FacilityListItemProfileImage";
import {useRouter} from "expo-router";
import FacilityListItemProfileData from "@/components/FacilityListItemProfileData";

const FacilityListItem = ({item}) => {
    const itemId = item?.id;
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                console.log("Item Pressed with Id.", itemId);
                console.log("Redirecting to the facilityDetails...")
                router.push(`/(auth)/facilityDetails/${itemId}`);
            }}
        >
            <View className="mb-3 border-2 border-gray-300 rounded-full p-2 mx-3">
                <View className="flex-row justify-center items-center">
                    <View className="rounded-full">
                        <FacilityListItemProfileImage item={item}/>
                    </View>
                    <View className="flex-1 h-full rounded-e-full px-3 py-0">
                        <FacilityListItemProfileData item={item}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FacilityListItem;