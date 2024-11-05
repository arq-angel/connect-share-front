import React from 'react';
import {View} from "react-native";
import {faPhone, faEnvelope, faMessage, faStar} from "@fortawesome/free-solid-svg-icons";
import ContactDetailsButton from "@/components/contact/ContactDetailsButton";
import ContactDetailsDescription from "@/components/contact/ContactDetailsDescription";
import ContactDetailsProfileImage from "@/components/contact/ContactDetailsProfileImage";
import ContactDetailsProfileInfo from "@/components/contact/ContactDetailsProfileInfo";
import ContactDetailsDescriptionAssignment from "@/components/contact/ContactDetailsDescriptionAssignment";
import ContactDetailsButtonFav from "@/components/contact/ContactDetailsButtonFav";

const ContactDetails = ({employee}) => {
    return (
        <View className="flex-1 flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center p-3">
                        <ContactDetailsProfileImage employee={employee}/>
                    </View>
                </View>

            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center">
                        <ContactDetailsProfileInfo employee={employee}/>
                    </View>
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-row justify-between items-center py-3 mx-6">
                        <ContactDetailsButton icon={faPhone} title="Call"/>
                        <ContactDetailsButton icon={faEnvelope} title="Email"/>
                        <ContactDetailsButton icon={faMessage} title="Text"/>
                        <ContactDetailsButtonFav employee={employee}/>
                    </View>
                </View>
            </View>
            <View className="flex-row bg-white px-3 py-1">
                <View className="flex-1">
                    <View className="flex-col gap-3 h-full justify-start items-start">
                        <ContactDetailsDescription title="Mobile" value={employee?.phone}/>
                        <ContactDetailsDescription title="Work" value={employee?.phone}/>
                        <ContactDetailsDescription title="Email" value={employee?.email}/>
                        <ContactDetailsDescriptionAssignment title="Assignments" assignments={employee?.assignments} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ContactDetails;