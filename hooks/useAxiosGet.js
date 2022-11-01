import { useEffect, useState } from 'react';
import axiosConfig from '../helper/axiosConfig';

function useAxiosGet(url, loading = null, successCallBack = null) {
    const [items, setItems] = useState(null);
    const [isLoading, setLoading] = useState(loading ?? true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosConfig
            .get(url)
            .then(response => {
                // console.log(response.data);
                if (successCallBack !== null) {
                    successCallBack(response);
                }
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return [items, isLoading, error];
}

export default useAxiosGet;
