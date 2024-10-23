import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {updateProfileFromAPI} from "../api/profile";
import {profileInfo} from "../store/mmkv/profileInfo";

export const useUpdateProfile = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isProfileSaved, setIsProfileSaved] = useState(false);
    const [isProfileSaveError, setIsProfileSaveError] = useState(false);

    console.log("Profile update react query start...")

    const {data, mutate, isPending} = useMutation({
        mutationFn: updateProfileFromAPI,
        onSuccess: (() => {
            setIsSaving(true);

            console.log("Save the fetched profile start...")

            saveUpdatedProfile();
        }),
        onError: (error) => {
            setIsSaving(false);
            setIsProfileSaveError(true);
            console.log("Error while saving profile: ", error);
        },
        onSettled: (() => {
            console.log("Profile update react query finished.")
        })
    })

    const saveUpdatedProfile = () => {
        console.log("Save the fetched profile start...")
        if (!data || isPending) return;

        try {
            setIsSaving(true);
            const profile = data.data;

            profileInfo.getState().setProfileInfo(
                profile?.firstName ?? '',
                profile?.middleName ?? '',
                profile?.lastName ?? '',
                profile?.image ?? '',
                profile?.email ?? '',
                profile?.phone ?? '',
                profile?.dateOfBirth ?? '',
                profile?.gender ?? '',
                profile?.address ?? '',
                profile?.suburb ?? '',
                profile?.state ?? '',
                profile?.postCode ?? '',
                profile?.country ?? '',
            )

            setIsSaving(false);
            setIsProfileSaved(true);

            console.log("Saved profile info - firstName: ", profileInfo.getState().firstName);

        } catch (error) {
            setIsSaving(false);
            setIsProfileSaveError(true);
            console.log("Error while saving profile: ", error);
        } finally {
            setIsSaving(false);
            console.log("Save the fetched profile finished.")
        }
    }

    return {
        mutate: mutate,
        isUpdatedProfileSaving: isSaving,
        isUpdatedProfileSaved: isProfileSaved,
        isUpdatedProfileSaveError: isProfileSaveError,
    }

}