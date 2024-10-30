import { useMutation } from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import Toast from "react-native-toast-message";
import {confirmTokenValidity} from "@/apis/remote/authAPI";
import {clearToken} from "@/redux/bearerTokenSlice";

export const useValidateTokenMutation = () => {
    const dispatch = useDispatch();

    const { mutate, status, isPending, isError, data, error } = useMutation({
        mutationFn: confirmTokenValidity,
        onSuccess: (data) => {
            console.log("Token Validation successful at useValidateTokenMutation: ", data);
            // Handle additional actions on success, like updating auth state

        },
        onError: (error) => {
            console.log("Token Validation error at useValidateTokenMutation: ", error);
            // Handle additional actions on error, like showing an error message

            // Clearing the stored token which is no longer valid
            dispatch(clearToken());

            Toast.show({
                type: 'customError',
                props: {
                    text1: 'Token Validation Failed!',
                    text2: error.message || 'An unknown error has occurred.',
                }
            });

        },
    });

    return { mutate, status, isPending, isError, data, error };
};