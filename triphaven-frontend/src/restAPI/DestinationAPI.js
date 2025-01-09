import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getDestinationListWithCityName = async () => {
    try {
        const response = await axios.get(`${API_URL}/destination/get`)
        return response.data;
    } catch (error) {
        console.log('Error in getting destination list. :', error)
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
}
