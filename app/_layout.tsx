import {useContext, useEffect} from "react";
import UserLoggedInProvider, {UserLoggedInContext} from "../context/UserLoggedIn";
import PageDetailsProvider from "../context/PageDetails";
import {Stack, useRouter} from "expo-router";

const InitialLayout = () => {
    const {userLoggedIn} = useContext(UserLoggedInContext);
    const router = useRouter();

    console.log("log status", userLoggedIn);

    useEffect(() => {
        if (!userLoggedIn) {
            router.replace('/login'); // Redirect if not logged in
        }
    }, [userLoggedIn]);

    return (
        <Stack>
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: true,
                    title: 'Login',
                }}
            />
            <Stack.Screen
                name="(home)"
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: true,
                    title: 'Profile',
                }}
            />
        </Stack>
    );
}

function checkAuthStatus() {
    // Implement your auth checking logic here
    return Promise.resolve(false);  // Placeholder
}

const RootLayout = () => {
    return (
        <UserLoggedInProvider>
            <PageDetailsProvider>
                <InitialLayout/>
            </PageDetailsProvider>
        </UserLoggedInProvider>
    );
};

export default RootLayout;