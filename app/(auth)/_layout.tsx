import {Stack} from "expo-router";
import {useState, useEffect, useContext} from "react";
import { bearerTokenStore } from "../../store/bearerTokenStore";
import { useRouter, Slot } from "expo-router";
import { useConfirmToken } from "../../api/auth";
import {SafeAreaView, Text} from "react-native";
import { UserLoggedInContext } from "../../context/UserLoggedIn";


export default function AuthLayout() {
    const [verifyingUser, setVerifyingUser] = useState(true);
    const token = bearerTokenStore.getState().token
    const router = useRouter();

    // Access setUserLoggedIn from context
    const { setUserLoggedIn } = useContext(UserLoggedInContext);

    // confirm token process after logging in
    const { mutate, error, data } = useConfirmToken();
    const handleVerifyToken = () => {
        if (!token) {
            // Redirect if no token exists
            console.warn("No token found, redirecting to login");
            setTimeout(() => {
                router.replace("/(auth)/login");
            }, 100);
            return;
        }

        mutate(token, {
            onSuccess: (data) => {
                // Handle the success response here
                console.log("Token Verified:", data.message);
                // alert("Token successfully verified!");
                setUserLoggedIn(true);
                setVerifyingUser(false);
            },
            onError: (error) => {
                // Handle any errors here
                console.error("Verification failed:", error);
                // alert(`Verification failed: ${error}`);
                setTimeout(() => {
                    router.replace("/(auth)/login");
                }, 100);
            }
        })
    }

    useEffect(() => {
        handleVerifyToken();
    }, []);

    if (verifyingUser) {
        // Optionally render a loading screen or spinner during verification
        return (
            <SafeAreaView>
                <Text>Verifying...</Text>
            </SafeAreaView>
        );
    }

    return (
        <Stack>

        </Stack>
    );
}
