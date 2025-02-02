import React, { useEffect } from "react";

const SingleVisitingPlaceInTheCity = ({ dataObject }) => {
//   useEffect(() => {
//     console.log("dataObject :", dataObject);
//   }, [dataObject]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-fullrounded-lg overflow-hidden">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl cursor-pointer">
        <img
          src={dataObject?.image}
          alt={dataObject?.destinationName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-2 text-start">
        <span className="capitalize font-medium text-lg">
          {dataObject?.destinationName}
        </span>
      </div>
    </div>
  );
};

export default SingleVisitingPlaceInTheCity;
