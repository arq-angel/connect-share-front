import React from 'react';
import {View} from "react-native";
import {faEnvelope, faMap, faPhone, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import FacilityDetailsProfileImage from "@/components/FacilityDetailsProfileImage";
import FacilityDetailsProfileInfo from "@/components/FacilityDetailsProfileInfo";
import FacilityDetailsButton from "@/components/FacilityDetailsButton";
import FacilityDetailsDescription from "@/components/FacilityDetailsDescription";

const FacilityDetails = ({facility}) => {
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
                        <FacilityDetailsButton icon={faPhone} title="Call"/>
                        <FacilityDetailsButton icon={faEnvelope} title="Email"/>
                        <FacilityDetailsButton icon={faMap} title="Map"/>
                        <FacilityDetailsButton icon={faProjectDiagram} title="Chart"/>
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