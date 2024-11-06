import {TouchableOpacity, View} from "react-native";
import OrgChartItem from "@/components/orgChart/OrgChartItem";
import OrgChartItemProfileImage from "@/components/orgChart/OrgChartItemProfileImage";
import OrgChartItemProfileData from "@/components/orgChart/OrgChartItemProfileData";

const CompanyOrgChart = ({companyOrgChart}) => {
    const company = companyOrgChart?.company;
    const facilities = companyOrgChart?.company?.facilities;

    console.log("Facilities", facilities);

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    console.log("Item Pressed with Id.");
                }}
            >
                <View className="mb-3 border-2 border-gray-300 rounded-full p-2 mx-3">
                    <View className="flex-row justify-center items-center">
                        <View className="rounded-full">
                            <OrgChartItemProfileImage item={company} />
                        </View>
                        <View className="flex-1 h-full rounded-e-full px-3 py-0">
                            <OrgChartItemProfileData item={company} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View className="flex-row">
                <View className="flex-1">
                    <View className="flex-col">
                        {facilities && (
                            facilities.map((item, key) => (
                                <OrgChartItem key={key} facility={item}/>
                            ))
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default CompanyOrgChart;