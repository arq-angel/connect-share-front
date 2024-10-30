import {useMutation, useQueryClient} from "@tanstack/react-query";
import {handleLogout} from "@/apis/remote/authAPI";
import {useDispatch} from "react-redux";
import {clearToken, setToken} from "@/redux/bearerTokenSlice";
import Toast from "react-native-toast-message";
import store from "@/redux/store";

export const useLogoutMutation = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const {mutate, status, isPending, isError, data, error} = useMutation({
        mutationFn: handleLogout,
        onSuccess: (data) => {
            console.log("Logout successful at useLogoutMutation: ", data);
            // Handle additional actions on success, like updating auth state

            dispatch(clearToken());
            console.log("Stored Token: ", store.getState().bearerToken.token);
            queryClient.removeQueries(["profile"]);

            Toast.show({
                type: 'customSuccess',
                props: {
                    text1: 'Log Out Successful!',
                    text2: 'You have been logged out successfully!.',
                }
            });

        },
        onError: (error) => {
            console.log("Log out error at useLogoutMutation: ", error);
            // Handle additional actions on error, like showing an error message

            if (!(error?.debug?.status == 401)) {
                Toast.show({
                    type: 'customError',
                    props: {
                        text1: 'Log out Failed!',
                        text2: error.message || 'An unknown error has occurred.',
                    }
                });
            }
        },
    });

    return {mutate, status, isPending, isError, data, error};
};