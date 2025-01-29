import { fetchSingleRestaurantByIdAPI } from "@/restAPI/RestaurantAPI";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleRestaurant = () => {
  const { restaurantId } = useParams();
  const [loading, setLoading] = useState(false)

  const fetchSingleRestaurantById = async (restaurantId) => {
    console.log("restaurant id :", restaurantId);
    setLoading(true)
    try {
        const response = await fetchSingleRestaurantByIdAPI(restaurantId)
        console.log('fetchSingleRestaurantById :', response)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.log('Error in fetchSingleRestaurantById :', error)
        toast.error('Something went wrong.')
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (restaurantId) {
        console.log('first')
      fetchSingleRestaurantById(restaurantId);
    }
  }, [restaurantId]);

  return <div>SingleRestaurant</div>;
};

export default SingleRestaurant;
