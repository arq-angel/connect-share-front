import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image, Linking, Platform} from "react-native";
import OrgChartItemProfileImage from "@/components/orgChartCompany/OrgChartItemProfileImage";
import OrgChartItemProfileData from "@/components/orgChartCompany/OrgChartItemProfileData";
import OrgChartDetailsButton from "@/components/orgChartCompany/OrgChartDetailsButton";
import {faEnvelope, faMap, faPhone, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "@/constants/Colors";


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
                <View style={{position: 'absolute', left: 20, top: -21, bottom: 0, width: 2}} className="bg-gray-300"/>
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
                            <OrgChartItemProfileImage item={facility}/>

                            {/* Centered Horizontal Line with Absolute Positioning */}
                            {hasParent && (
                                <View style={{
                                    position: 'absolute',
                                    left: -30,
                                    right: 0,
                                    height: 2,
                                    top: '50%',
                                    width: 23
                                }} className="bg-gray-300"/>
                            )}

                        </View>
                        <View className="flex-1 h-full rounded-e-full px-3 py-0">
                            <OrgChartItemProfileData item={facility}/>
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <View style={{width: 70}}></View>
                        <View className="flex-1">
                            {expanded && (
                                <ExpandedView facility={facility} hasParent={hasParent}/>
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
        <View className="flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    {/*This View is missing chart redirect button*/}
                    {/*<ExpandedViewDetails facility={facility}/>*/}
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <ExpandedViewIcons facility={facility} hasParent={hasParent}/>
                </View>
            </View>
        </View>
    )
}

const ExpandedViewDetails = ({facility}) => {
    const fullAddress = facility?.address + ', ' + facility?.suburb + ', ' + facility?.state + ', ' + facility?.postCode + ', ' + facility?.country;

    const titles = {
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
    }

    // Find the maximum length of titles
    const maxLength = Math.max(...Object.values(titles).map(title => title.length));
    const titleWidth = maxLength * 8;

    return (
        <>
            <ExpandedViewDetailsRow title={titles.phone} value={facility?.phone} titleWidth={titleWidth}/>
            <ExpandedViewDetailsRow title={titles.email} value={facility?.email} titleWidth={titleWidth}/>
            <ExpandedViewDetailsRow title={titles.address} value={fullAddress} titleWidth={titleWidth}/>
        </>
    )
}

const ExpandedViewDetailsRow = ({title, value, titleWidth}) => {

    let url = '';
    let app = '';
    if (title == "Phone") {
        url = `tel:${value}`;
        app = "phone";
    }

    if (title == "Email") {
        url = `mailto:${value}`;
        app = "mail";
    }

    if (title == "Address") {
        const query = encodeURIComponent(value);
        url = Platform.OS === 'ios' ? `maps:0,0?q=${query}` : `geo:0,0?q=${query}`;
        app = "map";
    }


    return (
        <View className="flex-row">
            <View className="flex-row justify-center items-start">
                <View style={{width: titleWidth}}>
                    <Text>{title}</Text>
                </View>
                <View>
                    <Text className="font-bold"> : </Text>
                </View>
            </View>
            <View className="flex-1 justify-center items-start">
                <TouchableOpacity
                    onPress={() => {
                        if (url) {
                            Linking.openURL(url)
                                .catch((error: Error) => {
                                    console.log(`Failed to open ${app} app`, error);
                                });
                        } else {
                            console.log("Empty url can not open any app with empty url.")
                        }
                    }}
                >
                    <Text style={{color: Colors.myApp.primary}}>{value}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const ExpandedViewIcons = ({facility, hasParent}) => {
    const fullAddress = facility?.address + ', ' + facility?.suburb + ', ' + facility?.state + ', ' + facility?.postCode + ', ' + facility?.country;

    return (
        <View className="flex-row items-center justify-between mt-2">
            <OrgChartDetailsButton icon={faPhone} title="Call" contact={{type: "call", detail: facility?.phone}}
                                   size={40} iconSize={20}/>
            <OrgChartDetailsButton icon={faEnvelope} title="Email" contact={{type: "email", detail: facility?.email}}
                                   size={40} iconSize={20}/>
            <OrgChartDetailsButton icon={faMap} title="Map" contact={{type: "map", detail: fullAddress}} size={40}
                                   iconSize={20}/>
            {hasParent ? (
                <OrgChartDetailsButton icon={faProjectDiagram} title="Chart"
                                       contact={{type: "chart", detail: facility?.id}} size={40} iconSize={20}/>
            ) : (
                <View style={{width: 80}}/>
            )}

        </View>
    )
}

export default OrgChartItem;