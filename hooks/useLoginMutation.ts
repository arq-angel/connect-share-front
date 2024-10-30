import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "@/apis/remote/authAPI";
import {useDispatch} from "react-redux";
import {setToken} from "@/redux/bearerTokenSlice";
import Toast from "react-native-toast-message";
import store from "@/redux/store";

export const useLoginMutation = () => {
    const dispatch = useDispatch();

    const { mutate, status, isPending, isError, data, error } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            console.log("Login successful at useLoginMutation: ", data);
            // Handle additional actions on success, like updating auth state

            dispatch(setToken({token: data.data.token, expiresAt: data.data.expiresAt}));
            console.log("Stored Token: ", store.getState().bearerToken.token);

            Toast.show({
                type: 'customSuccess',
                props: {
                    text1: 'Login Successful!',
                    text2: 'You have been logged in successfully!.',
                }
            });

        },
        onError: (error) => {
            console.log("Login error at useLoginMutation: ", error);
            // Handle additional actions on error, like showing an error message

            Toast.show({
                type: 'customError',
                props: {
                    text1: 'Login Failed!',
                    text2: error.message || 'An unknown error has occurred.',
                }
            });

        },
    });

    return { mutate, status, isPending, isError, data, error };
};