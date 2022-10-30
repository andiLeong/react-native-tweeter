import { useEffect, useState } from 'react';
import axiosConfig from '../helper/axiosConfig';

function useAxiosGet(url, loading = null) {
    const [items, setItems] = useState(null);
    const [isLoading, setLoading] = useState(loading ?? true);

    useEffect(() => {
        axiosConfig
            .get(url)
            .then(response => {
                // console.log(response.data);
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [url]);

    return [items, isLoading];
}

export default useAxiosGet;
