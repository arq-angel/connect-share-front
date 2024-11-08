import {FlatList, Text} from 'react-native';
import 'nativewind';
import FacilityOrgChartItem from "@/components/orgChartFacility/FacilityOrgChartItem";
import DepartmentOrgChartItem from "@/components/orgChartFacility/DepartmentOrgChartItem";

const FacilityOrgChartScreen = ({facilityOrgChart}) => {
    const facilityData = facilityOrgChart?.facility;
    const departmentData = facilityData?.departments;

    return (
        <FlatList
            ListHeaderComponent={<FacilityOrgChartItem facilityData={facilityData}/>}
            data={departmentData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <DepartmentOrgChartItem departmentData={item} hasParent = {true} />}
        />
    );
};

export default FacilityOrgChartScreen;
