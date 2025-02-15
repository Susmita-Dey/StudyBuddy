import { useState } from "react";

const useFetch = (callback) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await callback(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
            console.error(error);
        }
    }

    return { data, loading, error, fn, setData };
}

export default useFetch;