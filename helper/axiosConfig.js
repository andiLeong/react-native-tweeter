import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://twitter.andiliang.com',
});
export default instance;
