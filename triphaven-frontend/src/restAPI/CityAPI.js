import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getCitiesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/town/get`);
    return response.data;
  } catch (error) {
    console.log("Error in getting city list. :", error);
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

export const getCitiesWithRestaurantsList = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/restaurant/get-restaurants-with-town`
    );
    return response.data;
  } catch (error) {
    console.log("Error in getting city with restaurants list. :", error);
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

export const getCitiesWithDestinationsList = async (cityId) => {
  try {
    const response = await axios.get(
      `${API_URL}/town/get-town-with-destinations/${cityId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error in getting city with destinations list. :", error);
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};
