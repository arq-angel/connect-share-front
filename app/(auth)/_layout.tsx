import {Stack, useRouter} from "expo-router";
import {useContext, useEffect} from "react";
import {UserLoggedInContext} from "../../context/UserLoggedIn";

export default function AuthLayout() {
    const router = useRouter();
    const {userLoggedIn} = useContext(UserLoggedInContext);

    useEffect(() => {
        if (userLoggedIn) {
            router.replace('/(home)'); // redirect if logged in
        }
    }, [userLoggedIn]);


    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
