import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View, Text} from "react-native";
import ItemProfileImage from "@/components/orgChartFacility/ItemProfileImage";
import ItemProfileData from "@/components/orgChartFacility/ItemProfileData";
import EmployeeOrgChartItem from "@/components/orgChartFacility/EmployeeOrgChartItem";

const JobTitleOrgChartItem = ({jobTitleData, hasParent = true}) => {

    const employeeData = jobTitleData?.employees;

    return (
        <FlatList
            ListHeaderComponent={<JobTitleDetails jobTitleData={jobTitleData} hasParent={hasParent} />}
            data={employeeData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <EmployeeOrgChartItem employeeData={item} hasParent = {true} />}
        />
    );
};

const JobTitleDetails = ({jobTitleData, hasParent}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        console.log("Toggled")
        setExpanded(!expanded);
    }

    return (
        <View
            className={`flex-row items-center justify-between relative ${hasParent ? 'ps-6' : ''}`}
        >
            {hasParent && (
                <View style={{position: 'absolute', left: 22, top: -37, bottom: 0, width: 2}} className="bg-gray-300"/>
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
                            <ItemProfileImage item={jobTitleData} type="jobTitle"/>

                            {/* Centered Horizontal Line with Absolute Positioning */}
                            {hasParent && (
                                <View style={{
                                    position: 'absolute',
                                    left: -19,
                                    right: 0,
                                    height: 2,
                                    top: '50%',
                                    width: 10
                                }} className="bg-gray-300"/>
                            )}

                        </View>
                        <View className="flex-1 h-full rounded-e-full px-3 py-0">
                            <ItemProfileData item={jobTitleData} type="jobTitle"/>
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <View style={{width: 70}}></View>
                        <View className="flex-1">
                            {expanded && (
                                <>
                                    {/*<ExpandedView facility={facilityData} hasParent={false}/>*/}
                                    {/*<Text>{JSON.stringify(jobTitleData?.employees, null, 2)}</Text>*/}
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default JobTitleOrgChartItem;