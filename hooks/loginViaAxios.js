import axiosConfig from '../helper/axiosConfig';

function loginViaAxios(
    url,
    payload = null,
    successCallBack = null,
    failureCallback = null
) {
    // const [response, setResponse] = useState(null);
    // const [isLoading, setLoading] = useState(loading ?? true);
    // const [error, setError] = useState(null);
    // let isLoading = loading ?? true;
    // let result = null;
    // let error = null;

    console.log(payload);
    console.log('payload');
    console.log('calling post via axios');
    axiosConfig
        .post(url, payload)
        .then(response => {
            if (successCallBack !== null) {
                successCallBack(response);
            }
        })
        .catch(err => {
            if (failureCallback !== null) {
                failureCallback(err);
            }
        });
}

export default loginViaAxios;
