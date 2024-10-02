import {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity, Alert
} from 'react-native';
import {useRouter} from 'expo-router';
import {login} from '../../api/auth';
import {bearerTokenStore} from "../../store/bearerTokenStore";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        setEmail('john.doe@example.com');
        setPassword('password');
    }, []);

    const handleLogin = async () => {
        setLoggingIn(true);  // Start loading

        try {
            const response = await login(email, password);
            console.log('Login response:', response);

            if (response.success) {
                bearerTokenStore.getState().setToken(response.data.token);
                router.replace('/(home)');
            } else {
                Alert.alert('Error', response.message || 'Login failed');
            }
        } catch (error) {
            console.log('Login error:', error);
            Alert.alert('Error', 'An error occurred while logging in');
        } finally {
            setLoggingIn(false);  // Stop loading
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <View className="flex flex-col justify-center items-center mt-20 space-y-3">
                <Text className="text-4xl font-bold">Welcome back</Text>
                <Text className="text-2xl font-semibold">Enter the email and password</Text>
                <View className="flex-col justify-center items-center mt-20 space-y-2">
                    <TextInput
                        className="border-blue-500 text-xl"
                        placeholder="email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <TextInput
                        className="border-blue-500 text-xl"
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-blue-600 p-2 rounded-lg"
                    disabled={loggingIn}>
                    <Text className="text-xl text-white">
                        {loggingIn ? 'Logging in...' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
