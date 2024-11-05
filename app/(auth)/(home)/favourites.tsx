import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator, FlatList
} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import TopBar from "@/components/TopBar";
import SecondTopBar from "@/components/SecondTopBar";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import ContactListItem from "@/components/contact/ContactListItem";
import FavouriteListItem from "@/components/favourite/FavouriteListItem";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [startId, setStartId] = useState(null);
    const [endId, setEndId] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const favourites = useSelector((state: RootState) => state.favouriteContacts.contacts);

    // Filtered favourites based on search query with safety checks
    const filteredFavourites = favourites
        ? favourites.filter((item) => {
                if (item.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return item;
                }
            }
        )
            .sort((a, b) => a.firstName.localeCompare(b.firstName)) // Sort alphabetically by firstName
        : [];


    useEffect(() => {
        setTotalItems(filteredFavourites.length);
    }, [filteredFavourites]);

    const handleTextChange = (text) => {
        console.log("Search text:", text);
        setSearchQuery(text);
    }

    const onViewableItemsChanged = useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
            const firstVisibleItemIndex = viewableItems[0].index ?? 0;
            const lastVisibleItemIndex = viewableItems[viewableItems.length - 1].index ?? totalItems - 1;

            setStartId(firstVisibleItemIndex + 1); // Display 1-based index
            setEndId(lastVisibleItemIndex + 1);
        }
    }, [totalItems]);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <View className="flex-1 bg-white">
                <View className="flex-col">

                    {/* Top Bar Start */}
                    <TopBar searchTerm="favourites..." searchQuery={searchQuery} handleTextChange={handleTextChange}/>
                    {/* Top Bar End */}

                    {/* Second Top Bar Start */}
                    <View className="flex-row border-b-2 border-t-2 border-gray-200">
                        <View className="flex-1 flex-row justify-between items-center px-3 py-1.5">
                            <View>
                                <Text className="text-gray-800">Showing {startId} - {endId} of {totalItems}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Refresh pressed. Doesn't have any other action with it.")
                                }}>
                                <FontAwesomeIcon icon={faRefresh} size={20} color={Colors.myApp.primary}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Second Top Bar End */}

                    {/* FlatList View Start */}
                    <View className="flex-row mt-1">
                        <View className="flex-1">
                            <FlatList
                                data={filteredFavourites}
                                renderItem={({item}) =>
                                    (
                                        <FavouriteListItem item={item}/>
                                    )
                                }
                                keyExtractor={(item, index) => index.toString()}
                                onEndReachedThreshold={0.5} // Trigger when within 10% of the bottom
                                contentContainerStyle={{minHeight: '100%', paddingBottom: 180}}
                                onViewableItemsChanged={onViewableItemsChanged}
                                viewabilityConfig={viewabilityConfig}
                            />
                        </View>
                    </View>
                    {/* FlatList View End */}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Page;