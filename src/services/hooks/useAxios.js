import axios from 'axios';
import { AuthContext } from '../../auth/context/AuthContext';
import { useContext } from 'react';
import { apiUrl } from '../apiUrl';
const useAxios = () => {
    const { authState, logout } = useContext(AuthContext);
    const baseURL = apiUrl
    const axiosInstance = axios.create({
        baseURL: baseURL,
        //headers: { Authorization: `Bearer ${authState.user.refreshToken}`, 'Content-Type': 'application/json' }
    });

    axiosInstance.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;