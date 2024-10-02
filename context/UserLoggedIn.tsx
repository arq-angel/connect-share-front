import {useState, createContext, useContext, useEffect} from "react";
import {bearerTokenStore} from "../store/bearerTokenStore";

export const UserLoggedInContext = createContext({
    userLoggedIn: false,
    setUserLoggedIn: (value: boolean) => {},
})

const UserLoggedInProvider = ({ children }: any) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const token = bearerTokenStore.getState().token

    useEffect(() => {
        if (token) {
            setUserLoggedIn(true);
        }
    }, [token]);

    return (
        <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
            {children}
        </UserLoggedInContext.Provider>
    );
};

export default UserLoggedInProvider;
