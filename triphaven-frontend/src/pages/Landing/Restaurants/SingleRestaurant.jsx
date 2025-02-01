import { getCitiesWithDestinationsList } from "@/restAPI/CityAPI";
import { fetchSingleRestaurantByIdAPI } from "@/restAPI/RestaurantAPI";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SingleVisitingPlaceInTheCity from "./SingleVisitingPlaceInTheCity";

const sampleFeedbacks = [
  {
    userId: "User 1",
    feedback:
      "The food was absolutely amazing! The pasta was cooked to perfection.",
    rating: 5,
  },
  {
    userId: "User 2",
    feedback: "Good service, but the waiting time was a bit too long.",
    rating: 3,
  },
  {
    userId: "User 3",
    feedback: "The ambiance was great, but the food was just average.",
    rating: 4,
  },
  {
    userId: "User 4",
    feedback: "The dessert was too sweet for my taste.",
    rating: 2,
  },
  {
    userId: "User 5",
    feedback: "Excellent experience! Friendly staff and delicious food.",
    rating: 5,
  },
];

const SingleRestaurant = () => {
  const { restaurantId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [singleRestaurantData, setSingleRestaurantData] = useState(null);
  const [placesToVisitListInTheCity, setPlacesToVisitListInTheCity] = useState(
    []
  );

  const fetchSingleRestaurantById = async (restaurantId) => {
    setLoading(true);
    try {
      const response = await fetchSingleRestaurantByIdAPI(restaurantId);
      if (response.success) {
        setSingleRestaurantData(response.data);
      } else {
        setSingleRestaurantData(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSingleRestaurantData(null);
      console.log("Error in fetchSingleRestaurantById :", error);
      toast.error("Something went wrong.");
    }
  };

  const fetchVisitPlacesOfThisCity = async (cityId) => {
    setLoadingPlaces(true);
    try {
      const response = await getCitiesWithDestinationsList(cityId);
      //   console.log("fetchVisitPlacesOfThisCity response :", response);
      if (response.success) {
        setPlacesToVisitListInTheCity(response?.data?.destinations);
      } else {
        setPlacesToVisitListInTheCity([]);
      }
      setLoadingPlaces(false);
    } catch (error) {
      console.log("Error in fetchVisitPlacesOfThisCity :", error);
      setLoadingPlaces(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchSingleRestaurantById(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (singleRestaurantData) {
      fetchVisitPlacesOfThisCity(singleRestaurantData?.town?._id);
    }
  }, [singleRestaurantData]);

  return (
    <div>
      <div className="flex items-center justify-center">
        {loading ? (
          <>
            <div className="flex items-center justify-center space-x-2">
              <Loader className="animate-spin w-5 h-5" />
              <span>Loading...</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full gap-4">
            <div className="flex md:flex-row flex-col w-full justify-center gap-4">
              {singleRestaurantData !== null ? (
                <>
                  <div className="md:w-3/5 w-full lg:h-[500px] md:h-[400px] h-[450px] flex justify-center overflow-hidden">
                    <img
                      src={singleRestaurantData?.image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="md:w-2/5 w-full lg:h-[500px] md:h-[400px] h-[450px] p-8 flex flex-col md:justify-start justify-center gap-4 overflow-hidden">
                    <h1 className="lg:text-4xl md:text-2xl sm:text-2xl text-xl font-playwrite font-bold text-left">
                      {singleRestaurantData.restaurantName}.
                    </h1>
                    <div className="flex flex-col gap-3 md:mt-4 ">
                      <span className="pt-1 sm:text-xl text-lg font-mono">
                        Located in {singleRestaurantData?.town?.townName}
                      </span>
                      <div className="flex items-center ">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <span key={starIndex}>
                            {starIndex < singleRestaurantData.rating ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-yellow-500"
                              >
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.978 1.432 8.279L12 18.897l-7.368 4.666 1.432-8.279L.587 9.306l8.332-1.151z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-300"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                                />
                              </svg>
                            )}
                          </span>
                        ))}
                      </div>
                      <span className="">{singleRestaurantData.cuisine}</span>
                    </div>
                    <div className="">
                      <p className="font-thin lg:text-xl text-base text-left">
                        {singleRestaurantData?.description}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex items-center justify-center">
                    No data
                  </span>
                </>
              )}
            </div>
            <div className="w-full">
              <div className="md:ml-20 mx-8 flex md:flex-row flex-col gap-6">
                <div className="md:w-3/5 w-full flex flex-col">
                  <div className="w-full py-2">
                    <h2 className="md:text-2xl text-xl font-semibold capitalize font-playwrite">
                      This is the customers say.
                    </h2>
                    {sampleFeedbacks.length > 0 ? (
                      <>
                        {sampleFeedbacks.map((single, index) => (
                          <div
                            className="border rounded shadow-md flex flex-col mt-5 p-4"
                            key={index}
                          >
                            <p className="flex justify-start pb-3">
                              {single.feedback}
                            </p>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <span key={starIndex}>
                                  {starIndex < single.rating ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      className="w-5 h-5 text-yellow-500"
                                    >
                                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.978 1.432 8.279L12 18.897l-7.368 4.666 1.432-8.279L.587 9.306l8.332-1.151z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      className="w-5 h-5 text-gray-300"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                                      />
                                    </svg>
                                  )}
                                </span>
                              ))}
                            </div>

                            <span className="pt-3">{single?.userId}</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <span className="flex items-center justify-start mt-4">
                          No comments on this destination
                        </span>
                      </>
                    )}
                  </div>
                  <div>form</div>
                </div>
                <div className="md:w-2/5 w-full h-auto self-start">
                  <div className="md:pl-4 flex flex-col gap-2 md:px-2 px-0">
                    <h2 className="capitalize text-xl font-playwrite">
                      places to visit on the area.
                    </h2>

                    {loadingPlaces ? (
                      <>
                        <div className="flex items-center justify-start space-x-2 pt-5">
                          <Loader className="animate-spin w-5 h-5" />
                          <span>Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {placesToVisitListInTheCity.length > 0 ? (
                          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
                            {placesToVisitListInTheCity.map(
                              (singlePlace, index) => (
                                <div key={index} className="">
                                  <SingleVisitingPlaceInTheCity
                                    dataObject={singlePlace}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <>
                            <span className="flex items-center justify-start mt-4">
                              Sorry No places recorded here.
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRestaurant;
