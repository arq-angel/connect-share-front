import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {useRouter} from "expo-router";
import {useLogoutMutation} from "@/hooks/useLogoutMutation";
import {useCachedProfileData} from "@/hooks/useCachedProfileData";
import EmployeeDetailsProfileImage from "@/components/profile/EmployeeDetailsProfileImage";
import EmployeeDetailsProfileInfo from "@/components/profile/EmployeeDetailsProfileInfo";
import MenuListItem from "@/components/menu/MenuListItem";
import LogOutButton from "@/components/menu/LogOutButton";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    /** Logout Process start */
    const {mutate: logout, status, data, isError, error} = useLogoutMutation();

    const handleSubmit = () => {
        setIsLoading(true);
        console.log("Log out pressed");
        logout();
    }

    useEffect(() => {
        if (status === "success" && data?.success) {
            console.log("Successfully logged out.");
            console.log("Redirecting to login...");
            Promise.resolve().then(() => {
                setIsLoading(false);
                router.replace("/(auth)/login")
            })
        }
        if (status === "error" && !error?.success) {
            console.log("Log out unsuccessful.");
            setIsLoading(false);
        }
    }, [status, data, router, error])
    /** Logout Process end */

    /** Fetch Cached Profile Data start */
    const {data: profileData} = useCachedProfileData();
    /** Fetch Cached Profile Data end */

    return (
        <View className="flex-1 flex-col">
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center p-3">
                        <EmployeeDetailsProfileImage employee={profileData?.data}/>
                    </View>
                </View>
            </View>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col justify-center items-center pb-3">
                        <EmployeeDetailsProfileInfo employee={profileData?.data}/>
                    </View>
                </View>
            </View>

            <View className="flex-row bg-white">
                <View className="flex-1">
                    <View className="flex-col p-3">
                        <MenuListItem route="/(menu)/profile" title="Your Profile"/>
                        <MenuListItem route="/(menu)/settings" title="Settings"/>
                        <MenuListItem route="/(menu)/help" title="Help Center"/>
                        <MenuListItem route="/(menu)/privacy" title="Privacy Policy"/>
                    </View>
                </View>
            </View>

            <View className="flex-row bg-white">
                <View className="flex-1">
                    <View className="flex-col p-3 h-full">
                        <LogOutButton isLoading={isLoading} handleSubmit={handleSubmit}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Page;