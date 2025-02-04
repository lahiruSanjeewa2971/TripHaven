import axios from "axios";
const UNSPLASH_API_KEY = import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;

export const getMapDataForGivenLocation = async (locationName) => {
  console.log("location Name :", locationName);
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: { q: locationName, format: "json", limit: 1 },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in getMapDataForGivenLocation details. :", error);
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

export const getCityImagesFromUnsplash = async (locationName) => {
  console.log("location Name :", locationName);
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${locationName}&client_id=${UNSPLASH_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log("Error in getCityImagesFromUnsplash details. :", error);
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};
