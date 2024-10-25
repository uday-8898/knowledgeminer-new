import axios from 'axios';
 
const getTokenAndID = () => {
    const userId = sessionStorage.getItem('user-id');
    const token = sessionStorage.getItem('token');
    return { userId, token };
};
 
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
    withCredentials: true,
});
 
instance.interceptors.request.use(
    (config) => {
        const { userId, token } = getTokenAndID();
        if (userId, token) {
            config.headers['user-id'] = userId;
            config.headers['token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
export default instance;
 
 