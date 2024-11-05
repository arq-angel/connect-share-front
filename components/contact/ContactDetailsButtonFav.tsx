import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from "react-native";
import {Colors} from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlus, faStar, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {addContact, removeContact} from "@/redux/favouriteContactsSlice";
import {RootState} from "@/redux/store";

const ContactDetailsButtonFav = ({employee}) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.favouriteContacts.contacts)

    useEffect(() => {
        // Check if the current employee is already in the favorites list
        const existsInFavourites = contacts.some((contact) => contact.id === employee.id);
        setIsFavourite(existsInFavourites);
    }, [contacts, employee]);

    const handleToggleFavourite = () => {
        if (isFavourite) {
            console.log('Removing from favourites:', employee);
            dispatch(removeContact(employee.id)); // Use only the ID to remove
        } else {
            console.log('Adding to favourites:', employee);
            dispatch(addContact(employee));
        }
    };

    return (
        <TouchableOpacity onPress={handleToggleFavourite}>
            <View className="flex-col justify-center items-center">
                <View className="rounded-full justify-center items-center"
                      style={{
                          width: 50,
                          height: 50,
                          backgroundColor: isFavourite ? Colors.myApp.primary : "#fff",
                }}>
                    <FontAwesomeIcon icon={faStar} size={25}
                                     color={isFavourite ? "#fff" : Colors.myApp.primary}
                    />
                </View>
                <Text className="text-lg font-bold"
                      style={{
                    color: Colors.myApp.primary
                }}>
                    {isFavourite ? (
                        <FontAwesomeIcon icon={faMinus} size={25} color={Colors.myApp.primary}/>
                    ) : (
                        <FontAwesomeIcon icon={faPlus} size={25} color={Colors.myApp.primary}/>
                    )}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ContactDetailsButtonFav;