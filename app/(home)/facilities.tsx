import {View, Text, ScrollView} from 'react-native';
import {useContext, useEffect} from "react";
import {PageDetailsContext} from "../../context/PageDetails";
import {useIsFocused} from "@react-navigation/native";
import SearchBox from "../../components/SearchBox";

export default function Facilities() {
    const {setPageTitle} = useContext(PageDetailsContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setPageTitle('Facilities');
        }
    }, [isFocused]);

    return (
        <>
            <View className="bg-white">
                <SearchBox containerStyles={"mx-3 my-2"} placeholder="Search contacts..."  />
            </View>

            <ScrollView>
                <View>
                    <Text>Facilities Page</Text>
                </View>

            </ScrollView>
        </>
    );
}
