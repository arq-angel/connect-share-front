import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import FacilityOrgChart from "@/components/orgChart/FacilityOrgChart";
import {useFetchFacilityOrgChart} from "@/hooks/useFetchFacilityOrgChart";

const orgChartDetails = () => {
    // const [facilityOrgChart, setFacilityOrgChart] = useState(null);
    const params = useLocalSearchParams();
    const facilityId = params.id;

    // const {status, data, error, isLoading, isFetching, fetch} = useFetchFacilityOrgChart(facilityId);
    //
    // useEffect(() => {
    //     if (data) {
    //         setFacilityOrgChart(data)
    //         console.log("Data", data)
    //     }
    // }, [data]);

    // For debug purposes - haven't setup backend endpoint yet
    const facilityOrgChart = useFetchFacilityOrgChart(facilityId);

    return (
        <ScrollView className="flex-1">
            {facilityOrgChart ? (
                <>
                    <FacilityOrgChart facilityOrgChart={facilityOrgChart} />
                </>
            ) : (
                <View className="flex-1 flex-col items-center justify-center">
                    <Text className="text-xl text-red-600">Facility details could not be found.</Text>
                    <Text className="text-xl text-red-600">Please close and open the app again!</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default orgChartDetails;