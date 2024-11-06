import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Linking} from 'react-native';
import 'nativewind';
import OrgChartItem from "@/components/orgChart/OrgChartItem";

const CompanyInfo = ({company}) => {
    return (
        <View className="p-4 border-b border-gray-300 bg-white">
            <Image
                source={{uri: 'https://myapplib.com/' + company?.image}}
                style={{width: 100, height: 100, borderRadius: 50, marginBottom: 10}}
            />
            <Text className="text-2xl font-bold">{company?.name}</Text>
            <Text>{company?.address}, {company?.suburb}, {company?.state}, {company?.postcode}</Text>
            <Text>Phone: {company?.phone}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${company?.email}`)}>
                <Text>Email: {company?.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(company?.website)}>
                <Text style={{color: 'blue'}}>Website: {company?.website}</Text>
            </TouchableOpacity>
        </View>
    );
};

const FacilityItem = ({facility}) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);

    return (
        <View className="mt-0 ps-6 pe-3 flex-row relative">
            <View style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, backgroundColor: 'gray' }} />
            <View className="flex-1 pl-6">
                <TouchableOpacity onPress={toggleExpand}>
                    <View className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                        <Text className="text-lg font-semibold">{facility?.name}</Text>
                        <Text className="text-gray-600">{facility?.suburb}, {facility?.state}, {facility?.country}</Text>

                        {/* Centered Horizontal Line with Absolute Positioning */}
                        <View style={{ position: 'absolute', left: -23, right: 0, height: 2, backgroundColor: 'gray', top: '80%', width: 23  }} />
                    </View>
                </TouchableOpacity>

                {expanded && (
                    <View className="pl-4 mt-2">
                        <Text>Phone: <Text style={{ color: 'blue' }}>{facility?.phone}</Text></Text>
                        {facility?.email && (
                            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${facility.email}`)}>
                                <Text style={{ color: 'blue' }}>Email: {facility.email}</Text>
                            </TouchableOpacity>
                        )}
                        {facility?.website && (
                            <TouchableOpacity onPress={() => Linking.openURL(facility.website)}>
                                <Text style={{ color: 'blue' }}>Website: {facility.website}</Text>
                            </TouchableOpacity>
                        )}
                        <Text>Address: {facility?.address}</Text>
                        <Text>Established: {facility?.estDate}</Text>
                    </View>
                )}
            </View>
        </View>

    );
};

const OrgChartScreen = ({companyOrgChart}) => {
    const companyData = companyOrgChart?.company;
    const facilities = companyOrgChart?.company?.facilities;

    return (
        <FlatList
            ListHeaderComponent={<OrgChartItem facility={companyData}/>}
            // ListHeaderComponent={<CompanyInfo company={companyData}/>}
            data={companyData?.facilities}
            keyExtractor={(item) => item.id.toString()}
            // renderItem={({item}) => <FacilityItem facility={item}/>}
            renderItem={({item}) => <OrgChartItem facility={item} hasParent={true}/>}
        />
    );
};

export default OrgChartScreen;
