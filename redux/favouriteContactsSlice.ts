import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Assignment {
    facility: string;
    department: string;
    jobTitle: string;
}

interface Contact {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    image: string;
    email: string;
    phone: string;
    company: string;
    assignments: Assignment[];
}

interface FavouriteContactsState {
    contacts: Contact[];
}

const initialState : FavouriteContactsState = {
    contacts: [],
}

const favouriteContactsReducer = createSlice({
    name: "favourite-contacts-list",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((contact: Contact) => contact.id !== action.payload);
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },
    }
})

export const {addContact, removeContact, updateContact} = favouriteContactsReducer.actions;
export default favouriteContactsReducer.reducer;