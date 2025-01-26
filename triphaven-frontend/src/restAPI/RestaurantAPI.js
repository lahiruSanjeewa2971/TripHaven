import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const fetchAllRestaurantsBasedOnTownName = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/restaurant/get?${query}`)
        return response.data;
    } catch (error) {
        console.log('Error in getting restaurants list. :', error)
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
}
