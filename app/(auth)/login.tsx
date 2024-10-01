import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import {login} from '../../api/auth';

export default function Login() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    useEffect(() => {
        if (userLoggedIn) {
            router.replace('/(home)');
        }
    }, [userLoggedIn]);

    const handleLogin = async () => {

        /*if (email === 'abc@def.com' && password === 'password') {
            setUserLoggedIn(true);
        } else {
            Alert.alert('Error', 'Incorrect email or password');
        }*/

        try {
            const response = await login(email, password);
            console.log('Login successful:', response);
            setUserLoggedIn(true);
        } catch (error) {
            console.log('Login error:', error);
        }

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
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
                >
                    <Text className="text-xl text-white">Continue</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
