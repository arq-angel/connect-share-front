import React, {useEffect, useState} from 'react';
import {View, Text} from "react-native";
import {bearerTokenStore} from "../../store/bearerTokenStore";
import {clearEmployeesTable, saveEmployees} from "../../SQLite/employees";
import {createTable} from "../../SQLite/Database";

const Page = () => {
    const siteToken = '7|ddVwAWCcbmI9TrUIwnSJAqO7K7DJY6ypsX5Fq5pvad7907ac';
    const token = bearerTokenStore.getState().token;
    const [lastPage, setLastPage] = useState(null);

    console.log("token:", token);

    const fetchAndSaveEmployeesFromAPI = async (page, setLastPage) => {
        try {
            const response = await fetch(
                `https://myapplib.com/api/v1/employees?siteToken=${siteToken}&page=${page}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            const data = await response.json();
            console.log("Data:", data);
            if (data.success & data.data.requests.length > 0) {
                saveEmployees(data.data.requests, page);
                setLastPage(data.data.pagination.lastPage)
            }
        } catch (error) {
            console.log("Error fetching  page:", error);
        }
    }


    const downloadAndSaveAllPages = async () => {
        let currentPage = 1;

        await fetchAndSaveEmployeesFromAPI(currentPage);

        if (lastPage) {
            while (currentPage < lastPage) {
                await fetchAndSaveEmployeesFromAPI(currentPage);
                currentPage++;
            }
        } else {
            console.log("Last page information not retrieved. Stopping download");
        }
    }

    useEffect(() => {
        createTable();
        downloadAndSaveAllPages();
    }, [])

    const refetchEmployees = async () => {
        await clearEmployeesTable();
        console.log("Data cleared, re-fetching new employees...");
        await fetchAndSaveEmployeesFromAPI(1, setLastPage);
    }


    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg">Facilities Page</Text>
        </View>
    );
};

export default Page;