import axios from 'axios';

class Http {
    constructor() {
        this.axios = axios;
        this.payload = null;
    }

    via(method) {
        this.method = method;
        return this;
    }

    setPayload(payload) {
        this.payload = payload;
        return this;
    }

    to(url) {
        this.url = url;
        return this;
    }

    before(before) {
        this.beforeCallBack = before;
        return this;
    }

    after(after) {
        this.afterCallBack = after;
        return this;
    }

    onSuccess(success) {
        this.success = success;
        return this;
    }

    onFailure(failure) {
        this.failure = failure;
        return this;
    }

    call(closure, ...args) {
        if (typeof closure === 'function') {
            closure(...args);
        }
    }

    setInstance(axiosInstance) {
        this.axios = axiosInstance;
        return this;
    }

    setBaseUrl(url) {
        this.axios.defaults.baseURL = url;
        return this;
    }

    bearToken(token) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return this;
    }

    fire() {
        this.call(this.beforeCallBack);
        this.axios[this.method](this.url, this.payload)
            .then(response => {
                this.call(this.success, response);
                this.call(this.afterCallBack);
            })
            .catch(error => {
                this.call(this.failure, error);
                this.call(this.afterCallBack);
            });
    }
}

export default Http;
