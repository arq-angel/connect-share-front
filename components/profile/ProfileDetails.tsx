import React from 'react';
import {View} from "react-native";
import EmployeeDetailsProfileImage from "@/components/profile/EmployeeDetailsProfileImage";
import EmployeeDetailsProfileInfo from "@/components/profile/EmployeeDetailsProfileInfo";
import ProfileDetailsDescription from "@/components/profile/ProfileDetailsDescription";
import ProfileDetailsDescriptionAssignment from "@/components/profile/ProfileDetailsDescriptionAssignment";

const ProfileDetails = ({profile}) => {
    return (
        <View className="flex-1 flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center p-3">
                        <EmployeeDetailsProfileImage employee={profile}/>
                    </View>
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center pb-3">
                        <EmployeeDetailsProfileInfo employee={profile}/>
                    </View>
                </View>
            </View>

            <View className="flex-row bg-white">
                <View className="flex-1">
                    <View className="flex-col gap-3 h-full justify-start items-start p-3">
                        <ProfileDetailsDescription title="Name" value={`${profile?.firstName} ${profile?.middleName} ${profile?.lastName}`}/>
                        <ProfileDetailsDescription title="Date of Birth" value={profile.dateOfBirth}/>
                        <ProfileDetailsDescription title="Gender" value={profile.gender}/>
                        <ProfileDetailsDescription title="Email" value={profile.email}/>
                        <ProfileDetailsDescription title="Phone" value={profile.phone}/>
                        <ProfileDetailsDescription title="Address" value={`${profile?.address}, ${profile?.suburb}, ${profile?.state}, ${profile?.postCode}`}/>
                        <ProfileDetailsDescriptionAssignment title="Assignments" assignments={profile?.assignments}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProfileDetails;