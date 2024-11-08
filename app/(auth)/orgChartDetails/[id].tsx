import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useFetchFacilityOrgChart} from "@/hooks/useFetchFacilityOrgChart";
import {Colors} from "@/constants/Colors";
import FacilityOrgChartScreen from "@/components/orgChartFacility/FacilityOrgChart";

const orgChartDetails = () => {
    const [facilityOrgChart, setFacilityOrgChart] = useState(null);
    const params = useLocalSearchParams();
    const facilityId = params.id;

    // For debug purposes - haven't setup backend endpoint yet
    const {status, data, error, isLoading, isFetching, fetch} = useFetchFacilityOrgChart(facilityId);

    useEffect(() => {
        setFacilityOrgChart(data?.data);
    }, [isLoading, data]);

    return (
        <View className="flex-1 bg-white">
            <View className="flex-col">
                <View className="flex-row">
                    <View className="flex-1">
                        {(status === 'pending' || isLoading) && (
                            <View className="flex justify-center items-center mt-3">
                                <ActivityIndicator size="large" color={Colors.myApp.primary}/>
                            </View>
                        )}

                        {status === 'error' && (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{color: 'red'}}>Error: {error?.message || 'Something went wrong'}</Text>
                            </View>
                        )}

                        {!isLoading && facilityOrgChart && (
                            <FacilityOrgChartScreen facilityOrgChart={facilityOrgChart} />
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default orgChartDetails;