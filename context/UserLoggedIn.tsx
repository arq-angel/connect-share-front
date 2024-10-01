import {useState} from "react";


const UserLoggedInProvider = ({children}: any) => {
    const [loggedIn, setLoggedIn] = useState(true);

    return children;

};

export default UserLoggedInProvider;