import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const PostUserFeedbackOnDestination = async (feedbackRecord, token) => {
    try {
        const response = await axios.post(`${API_URL}/feedback/add`, feedbackRecord, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        console.log('Error in PostUserFeedbackOnDestination details. :', error)
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
}
