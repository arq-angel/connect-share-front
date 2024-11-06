import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image, Linking} from "react-native";
import OrgChartItemProfileImage from "@/components/orgChart/OrgChartItemProfileImage";
import OrgChartItemProfileData from "@/components/orgChart/OrgChartItemProfileData";
import OrgChartDetailsButton from "@/components/orgChart/OrgChartDetailsButton";
import {faEnvelope, faMap, faPhone, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";

const OrgChartItem = ({facility, hasParent = false, isLastChild = false}) => {
    const [imageError, setImageError] = useState(false);
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
                <View style={{ position: 'absolute', left: 20, top: -21, bottom: 0, width: 2}} className="bg-gray-300" />
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
                            <OrgChartItemProfileImage item={facility} />

                            {/* Centered Horizontal Line with Absolute Positioning */}
                            {hasParent && (
                                <View style={{ position: 'absolute', left: -30, right: 0, height: 2, top: '50%', width: 23  }} className="bg-gray-300" />
                            )}

                        </View>
                        <View className="flex-1 h-full rounded-e-full px-3 py-0">
                            <OrgChartItemProfileData item={facility} />
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <View style={{width: 70}}></View>
                        <View className="flex-1">
                            {expanded && (
                                <ExpandedView facility={facility} hasParent={hasParent} />
                            )}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const ExpandedView = ({facility, hasParent}) => {
    const fullAddress = facility?.address + ', ' + facility?.suburb + ', ' + facility?.state + ', ' + facility?.postCode + ', ' + facility?.country;

    return (
        <View className="flex-row items-center justify-between mt-2">
            <OrgChartDetailsButton icon={faPhone} title="Call" contact={{type: "call", detail: facility?.phone}} size={40} iconSize={20}/>
            <OrgChartDetailsButton icon={faEnvelope} title="Email" contact={{type: "email", detail: facility?.email}} size={40} iconSize={20}/>
            <OrgChartDetailsButton icon={faMap} title="Map" contact={{type: "map", detail: fullAddress}} size={40} iconSize={20}/>
            {hasParent ? (
                <OrgChartDetailsButton icon={faProjectDiagram} title="Chart" contact={{type: "chart", detail: facility?.id}} size={40} iconSize={20}/>
            ): (
                <View style={{width: 80}} />
            )}

        </View>
    )
}

export default OrgChartItem;