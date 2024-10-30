import React, {useEffect} from 'react';
import {View, Text} from "react-native";
import {useFetchProfileQuery} from "@/hooks/useFetchProfileQuery";
import {useQueryClient} from "@tanstack/react-query";

const Page = () => {
    const queryClient = useQueryClient();


    /** Fetch Profile Data from remote API start */
    const {fetch: profileFetch} = useFetchProfileQuery();
    useEffect(() => {
        // this works hand in hand with the axiosConfig where i have invalidated the cache on 401 response - but that needs to be fixed
        queryClient.invalidateQueries(["profile"]);
        profileFetch();
    }, []);
    /** Fetch Profile Data from remote API end */


    return (
        <View className="flex-1 justify-center items-center">
            <Text>Contacts Page</Text>
        </View>
    );
};

export default Page;