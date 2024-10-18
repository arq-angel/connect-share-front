import {Text, View} from "react-native";

export const toastConfig = {
    customSuccess: ({props}) => (
        <View className="bg-white rounded-lg p-2 mt-4 shadow-md border-l-8 border-green-500 flex-row mx-2">
            <View className="flex-col justify-between flex-1">
                <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
                <Text className="text-black text-sm text-left">{props.text2}</Text>
            </View>
        </View>
    ),
    customError: ({props}) => (
        <View className="bg-white rounded-lg p-2 mt-4 shadow-md border-l-8 border-red-500 flex-row mx-2">
            <View className="flex-col justify-between flex-1">
                <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
                <Text className="text-black text-sm text-left">{props.text2}</Text>
            </View>
        </View>

    ),
    customWarning: ({props}) => (
        <View className="bg-white rounded-lg p-2 mt-4 shadow-md border-l-8 border-yellow-500 flex-row mx-2">
            <View className="flex-col justify-between flex-1">
                <Text className="text-black font-bold text-lg text-left">{props.text1}</Text>
                <Text className="text-black text-sm text-left">{props.text2}</Text>
            </View>
        </View>
    )
};
