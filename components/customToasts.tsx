import {Text, View} from "react-native";

export const toastConfig = {
    customSuccess: ({props}) => (
        <View className="bg-white rounded-lg p-2 pr-48 mt-4 shadow-md border-l-8 border-green-500">
            <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
            <Text className="text-black text-sm text-left">{props.text2}</Text>
        </View>
    ),
    customError: ({props}) => (
        <View className="bg-white rounded-lg p-2 pr-48 mt-4 shadow-md border-l-8 border-red-500">
            <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
            <Text className="text-black text-sm text-left">{props.text2}</Text>
        </View>
    ),
    customWarning: ({props}) => (
        <View className="bg-white rounded-lg p-2 pr-48 mt-4 shadow-md border-l-8 border-yellow-500">
            <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
            <Text className="text-black text-sm text-left">{props.text2}</Text>
        </View>
    )
};
