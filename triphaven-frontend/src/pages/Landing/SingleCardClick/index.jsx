import { getDestinationDetailsById } from "@/restAPI/DestinationAPI";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FullViewOfSingleCard = () => {
  const { itemId } = useParams();

  const fetchFullDataofSingleDestination = async (itemId) => {
    try {
        const response = await getDestinationDetailsById(itemId);
        console.log('getDestinationDetailsById :', response)
    } catch (error) {
        console.log("Error in fetchFullDataofSingleDestination :", error)
        toast.error("Something went wrong.")
    }
  }

  useEffect(() => {
    if(itemId){
        fetchFullDataofSingleDestination(itemId)
    }
  }, [itemId])
  return <div>FullViewOfSingleCard</div>;
};

export default FullViewOfSingleCard;
