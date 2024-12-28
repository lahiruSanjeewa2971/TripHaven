import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)
        return response.data;
    } catch (error) {
        console.log('Error in login :', error)
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
}

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials)
        return response.data;
    } catch (error) {
        console.log('Error in login :', error)
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
}