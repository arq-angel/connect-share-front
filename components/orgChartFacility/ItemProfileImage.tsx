import React, {useState} from 'react';
import {Image, Text, View} from "react-native";

const ItemProfileImage = ({item, type = 'facility'}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {item?.image && !imageError ? (
                <Image
                    source={{uri: 'https://myapplib.com/' + item?.image}}
                    className="rounded-full"
                    style={{height: 60, width: 60}}
                    onError={() => setImageError(true)}
                />
            ) : (
                <View className="bg-gray-300 rounded-full justify-center items-center"
                      style={{width: 60, height: 60}}>
                    {((type == 'facility') || (type == 'department') || (type == 'employee')) && (
                        <Text className="text-4xl">
                            {item?.name[0]}
                        </Text>
                    )}
                    {(type == 'jobTitle') && (
                        <Text className="text-4xl">
                            {item?.title[0]}
                        </Text>
                    )}
                </View>
            )
            }
        </>
    );
};

export default ItemProfileImage;