import {TouchableOpacity, View} from "react-native";
import ContactListItemProfileImage from "@/components/contact/ContactListItemProfileImage";
import ContactListItemProfileData from "@/components/contact/ContactListItemProfileData";
import {useRouter} from "expo-router";

const FavouriteListItem = ({item}) => {
    const itemId = item?.id;
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                console.log("Item Pressed with Id.", itemId);
                console.log("Redirecting to the favouriteEmployeeDetails...")
                router.push(`/(auth)/favouriteEmployeeDetails/${itemId}`);
            }}
        >
            <View className="mb-3 border-2 border-gray-300 rounded-full p-2 mx-3">
                <View className="flex-row justify-center items-center">
                    <View className="rounded-full">
                        <ContactListItemProfileImage item={item}/>
                    </View>
                    <View className="flex-1 h-full rounded-e-full px-3 py-0">
                        <ContactListItemProfileData item={item}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FavouriteListItem;