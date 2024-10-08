import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from "react-native";
import {defaultStyles} from "../constants/Styles";
import {useEffect, useState} from "react";
import {useLoginMutation} from "../api/auth";
import {bearerTokenStore} from "../store/bearerTokenStore";

export default function Page() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        deviceName: ""
    });

    // setting data for easy development - remove in the future - fix for deviceName
    useEffect(() => {
        setLoginData({
            email: "john@example.com",
            password: "password",
            deviceName: "iOS Emulator"
        })
    }, []);

    // login process
    const { mutate, error, data } = useLoginMutation();
    const handleLogin = () => {
        mutate(loginData, {
            onSuccess: (data) => {
                // Handle the success case here, like saving the token
                console.log("Token:", data.token);
                console.log("Token Expiration:", data.expiresAt);

                bearerTokenStore.getState().setToken(data.token, data.expiresAt);

                console.log("Stored Bearer Token:", bearerTokenStore.getState().token);
                console.log("Stored Token expiration:", bearerTokenStore.getState().expiresAt);

            },
            onError: (err) => {
                console.error("Login failed:", err);
            }
        });
    };

    return (
        <View style={defaultStyles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={loginData.email}
                    onChangeText={(text) => setLoginData({ ...loginData, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={loginData.password}
                    onChangeText={(text) => setLoginData({ ...loginData, password: text })}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 150,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
