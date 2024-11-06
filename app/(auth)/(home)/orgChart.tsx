import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from "react-native";
import {useFetchFacilityOrgChart} from "@/hooks/useFetchFacilityOrgChart";
import {Colors} from "@/constants/Colors";
import OrgChartScreen from "@/components/orgChart/demoCompanyOrgChart";

const Page = () => {
    const [companyOrgChart, setCompanyOrgChart] = useState([]);

    const {status, data, error, isLoading, isFetching, fetch} = useFetchFacilityOrgChart();

    useEffect(() => {
        if (!isLoading && data) {

            // console.log("Data: ", data.data)

            setCompanyOrgChart(data?.data);
        }
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

                        {!isLoading && companyOrgChart && (
                            <OrgChartScreen companyOrgChart={companyOrgChart} />
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Page;