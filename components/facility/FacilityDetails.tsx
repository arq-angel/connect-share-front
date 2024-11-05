import React from 'react';
import {View} from "react-native";
import {faEnvelope, faMap, faPhone, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import FacilityDetailsProfileImage from "@/components/facility/FacilityDetailsProfileImage";
import FacilityDetailsProfileInfo from "@/components/facility/FacilityDetailsProfileInfo";
import FacilityDetailsButton from "@/components/facility/FacilityDetailsButton";
import FacilityDetailsDescription from "@/components/facility/FacilityDetailsDescription";

const FacilityDetails = ({facility}) => {

    const fullAddress = facility?.address + ', ' + facility?.suburb + ', ' + facility?.state + ', ' + facility?.postCode + ', ' + facility?.country;

    console.log("full address", fullAddress);

    return (
        <View className="flex-1 flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center p-3">
                        <FacilityDetailsProfileImage facility={facility}/>
                    </View>
                </View>

            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center">
                        <FacilityDetailsProfileInfo facility={facility}/>
                    </View>
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-row justify-between items-center py-3 mx-6">
                        <FacilityDetailsButton icon={faPhone} title="Call" contact={{type: "call", detail: facility?.phone}}/>
                        <FacilityDetailsButton icon={faEnvelope} title="Email" contact={{type: "email", detail: facility?.email}}/>
                        <FacilityDetailsButton icon={faMap} title="Map" contact={{type: "map", detail: fullAddress}}/>
                        <FacilityDetailsButton icon={faProjectDiagram} title="Chart" contact={{type: "chart", detail: facility?.id}}/>
                    </View>
                </View>
            </View>
            <View className="flex-row bg-white px-3 py-1">
                <View className="flex-1">
                    <View className="flex-col gap-3 h-full justify-start items-start">
                        <FacilityDetailsDescription title="Phone" value={facility?.phone}/>
                        <FacilityDetailsDescription title="Email" value={facility?.email}/>
                        <FacilityDetailsDescription title="Address" value={facility?.address}/>
                        <FacilityDetailsDescription title="Suburb" value={facility?.suburb}/>
                        <FacilityDetailsDescription title="State" value={facility?.state}/>
                        <FacilityDetailsDescription title="Post Code" value={facility?.postCode}/>
                        <FacilityDetailsDescription title="Established Date" value={facility?.estDate}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FacilityDetails;