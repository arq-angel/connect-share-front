import React, {useState} from 'react';
import {Image, Text, View} from "react-native";

const FacilityDetailsProfileImage = ({facility}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {facility?.image && !imageError ? (
                <Image
                    source={{uri: 'https://myapplib.com/' + facility?.image}}
                    className="rounded-full"
                    style={{height: 120, width: 120}}
                    onError={() => setImageError(true)}
                />
            ) : (
                <View className="bg-gray-300 rounded-full justify-center items-center"
                      style={{width: 120, height: 120}}>
                    <Text className="text-4xl">
                        {facility?.name[0]}{facility?.name[1]}
                    </Text>
                </View>
            )
            }
        </>
    );
};

export default FacilityDetailsProfileImage;