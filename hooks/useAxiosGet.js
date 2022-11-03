import { useEffect, useState } from 'react';
import appAxios from '../helper/appAxios';

function useAxiosGet(url, loading = null, successCallBack = null) {
    const [items, setItems] = useState(null);
    const [isLoading, setLoading] = useState(loading ?? true);
    const [error, setError] = useState(null);

    useEffect(() => {
        appAxios
            .via('get')
            .to(url)
            .onSuccess(response => {
                if (successCallBack !== null) {
                    successCallBack(response);
                }
                setItems(response.data);
                setLoading(false);
            })
            .onFailure(error => {
                console.log(error);
                setError(error);
            })
            .after(() => setLoading(false))
            .fire();
    }, [url]);

    return [items, isLoading, error];
}

export default useAxiosGet;
