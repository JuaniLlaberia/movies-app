import { useEffect, useState } from 'react'

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if(!response.ok) throw new Error('Server problems. We apologies for the inconvenience. Try again later!');
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {data, error, loading}
}

export default useFetchData
