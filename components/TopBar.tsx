import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal} from "react-native";
import SearchBar from "@/components/SearchBar";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import FilterModal from "@/components/FilterModal";

const TopBar = ({searchQuery, handleTextChange, searchTerm, showFilter = false}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-row">
                <View className="flex-1 justify-center items-center p-3">
                    <View className="flex-row justify-center items-center">
                        <View className="flex-1">
                            <SearchBar searchTerm={searchTerm} searchQuery={searchQuery}
                                       handleTextChange={handleTextChange} containerStyles=""/>
                        </View>
                        {showFilter && (
                            <View className="ps-2">
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("Show Modal Here...")
                                        setModalVisible(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFilter} size={20} color={Colors.myApp.primary}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>


                {/* Modal for Filter Options */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <FilterModal setModalVisible={setModalVisible} />
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default TopBar;