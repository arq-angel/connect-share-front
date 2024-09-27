import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

export function fetchEmployees() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch(`https://myapplib.com/api/v1/employees`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                const result = await response.json();
                setData(result.data);  // Store the fetched data in the state
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {data, loading, error};  // Return the data, loading, and error states
}
