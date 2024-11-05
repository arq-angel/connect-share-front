import React from 'react';
import {View} from "react-native";

const HorizontalBar = ({length = 100, thickness = 2, color = "black"}) => {
    return (
        <View
            style={{
                width: length,
                height: thickness,
                backgroundColor: color,
            }}
        />
    );
};

export default HorizontalBar;