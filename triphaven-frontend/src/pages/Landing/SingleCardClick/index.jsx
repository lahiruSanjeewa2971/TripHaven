import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FullViewOfSingleCard = () => {
  const { itemId } = useParams();

  useEffect(() => {
    if(itemId){
        // fetchFullDataof
    }
  }, [itemId])
  return <div>FullViewOfSingleCard</div>;
};

export default FullViewOfSingleCard;
