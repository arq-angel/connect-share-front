import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {getProfileFromAPI} from "../api/profile";
import {profileInfo} from "../store/mmkv/profileInfo";


export const useFetchProfile = () => {
    const [shouldFetch, setShouldFetch] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isProfileSaved, setIsProfileSaved] = useState(false);
    const [isProfileSaveError, setIsProfileSaveError] = useState(false);


    const {data, error, isFetching, status, refetch, isLoading} = useQuery({
        queryKey: ['facilities', 'live', 'all'],
        queryFn: getProfileFromAPI,
        enabled: shouldFetch,
    });

    useEffect(() => {
        const fetchAndSaveProfile = () => {
            console.log("Save the fetched profile start...")
            if (!data || isFetching || isLoading) return;

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

        if (shouldFetch) {
            fetchAndSaveProfile();
        }

    }, [shouldFetch, data]);

    const handleRefetch = () => {
        console.log("Manual refetch triggered");

        profileInfo.getState().clearProfileInfo();
        console.log("Profile info - firstName after clearing: ", profileInfo.getState().firstName);

        setIsProfileSaved(false);
        setShouldFetch(true);
        refetch();
    }

    return {
        isFetching,
        refetch: handleRefetch,
        isSaving: isSaving,
        isProfileSaved: isProfileSaved,
        isProfileSaveError: isProfileSaveError,
    };

}