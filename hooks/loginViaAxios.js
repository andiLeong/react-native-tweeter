import axiosConfig from '../helper/axiosConfig';

function loginViaAxios(
    url,
    payload = null,
    successCallBack = null,
    failureCallback = null
) {
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
