import React, {useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import ItemProfileImage from "@/components/orgChartFacility/ItemProfileImage";
import ItemProfileData from "@/components/orgChartFacility/ItemProfileData";

const EmployeeOrgChartItem = ({employeeData, hasParent = true}) => {
    return (
        <>
            <EmployeeDetails employeeData={employeeData} hasParent={hasParent} />
        </>
    );
};

const EmployeeDetails = ({employeeData, hasParent}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        console.log("Toggled")
        setExpanded(!expanded);
    }

    return (
        <View
            className={`flex-row items-center justify-between relative ${hasParent ? 'ps-9' : ''}`}
        >
            {hasParent && (
                <View style={{position: 'absolute', left: 33, top: -37, bottom: 0, width: 2}} className="bg-gray-300"/>
            )}

            {/*{isLastChild && (*/}
            {/*    <View style={{ position: 'absolute', left: 20, top: -25, bottom: 0, width: 2, height: 0.5, backgroundColor: 'gray' }} />*/}
            {/*)}*/}

            <View className=""></View>
            <TouchableOpacity
                onPress={() => {
                    toggleExpanded();
                }}
                className="flex-1"
            >
                <View className="mb-3 border-2 border-gray-300 rounded-lg p-2 mx-3" style={{borderRadius: 35}}>
                    <View className="flex-row justify-center items-center">
                        <View className="rounded-full">
                            <ItemProfileImage item={employeeData} type="employee"/>

                            {/* Centered Horizontal Line with Absolute Positioning */}
                            {hasParent && (
                                <View style={{
                                    position: 'absolute',
                                    left: -18,
                                    right: 0,
                                    height: 2,
                                    top: '50%',
                                    width: 9
                                }} className="bg-gray-300"/>
                            )}

                        </View>
                        <View className="flex-1 h-full rounded-e-full px-3 py-0">
                            <ItemProfileData item={employeeData} type="employee"/>
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <View style={{width: 70}}></View>
                        <View className="flex-1">
                            {expanded && (
                                <>
                                    {/*<ExpandedView facility={facilityData} hasParent={false}/>*/}
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default EmployeeOrgChartItem;