import {useState, createContext, useEffect} from "react";

export const UserLoggedInContext = createContext({
    userLoggedIn: false,
    setUserLoggedIn: (value: boolean) => {},
})

const UserLoggedInProvider = ({ children }: any) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserLoggedInContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
            {children}
        </UserLoggedInContext.Provider>
    );
};

export default UserLoggedInProvider;
