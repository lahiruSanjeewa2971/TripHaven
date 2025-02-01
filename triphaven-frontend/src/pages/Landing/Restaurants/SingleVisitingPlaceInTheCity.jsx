import React, { useEffect } from "react";

const SingleVisitingPlaceInTheCity = ({ dataObject }) => {
  useEffect(() => {
    console.log("dataObject :", dataObject);
  }, [dataObject]);
  return (
    <div className="flex items-center justify-center flex-col">
        <div>
            <img
                src={dataObject?.image}
                alt=""
                className="w-full h-full object-cover"
            />
        </div>
        <div>
            <span className="capitalize">{dataObject.destinationName}</span>
        </div>
    </div>
    // <div className="w-full h-full flex flex-col justify-start gap-2 ">
    //   <div className="md:w-2/5 sm:w-2/5 w-3/5">
    //     <img
    //       src={dataObject?.image}
    //       alt=""
    //       className="w-full h-full object-cover rounded-xl"
    //     />
    //     <div className="flex flex-col justify-start ">
    //       <span className="font-semibold lg:text-xl md:text-xl sm:text-xl my-2">
    //         {dataObject?.destinationName}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SingleVisitingPlaceInTheCity;
