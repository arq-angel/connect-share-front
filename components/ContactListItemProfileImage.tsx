import React, {useState} from 'react';
import {Image, Text, View} from "react-native";

const ContactListItemProfileImage = ({item}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {item?.image && !imageError ? (
                <Image
                    source={{uri: `https://myapplib.com/${item?.image}`}}
                    className="rounded-full"
                    style={{height: 60, width: 60}}
                    onError={() => setImageError(true)}
                />
            ) : (
                <View
                    className="bg-gray-300 rounded-full justify-center items-center"
                    style={{width: 60, height: 60}}
                >
                    <Text className="text-3xl">
                        {item?.firstName[0]}
                        {item?.lastName[0]}
                    </Text>
                </View>
            )}
        </>

    )
};

export default ContactListItemProfileImage;