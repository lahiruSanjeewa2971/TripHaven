import { fetchSingleRestaurantByIdAPI } from "@/restAPI/RestaurantAPI";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleRestaurant = () => {
  const { restaurantId } = useParams();
  const [loading, setLoading] = useState(false);
  const [singleRestaurantData, setSingleRestaurantData] = useState(null);

  const fetchSingleRestaurantById = async (restaurantId) => {
    console.log("restaurant id :", restaurantId);
    setLoading(true);
    try {
      const response = await fetchSingleRestaurantByIdAPI(restaurantId);
      console.log("fetchSingleRestaurantById :", response.data);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (restaurantId) {
      console.log("first");
      fetchSingleRestaurantById(restaurantId);
    }
  }, [restaurantId]);

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
                  <div className="md:w-2/5 w-full p-10 flex flex-col md:justify-start justify-center gap-4">
                    <h1 className="lg:text-4xl md:text-2xl sm:text-2xl text-xl font-playwrite font-bold text-left">{singleRestaurantData.restaurantName}.</h1>
                    <h2 className="py-6 text-xl">{singleRestaurantData?.town?.townName}</h2>
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
            <div className="w-full flex items-center justify-center">
              description
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRestaurant;
