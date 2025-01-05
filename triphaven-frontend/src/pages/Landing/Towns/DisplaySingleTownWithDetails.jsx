import React from "react";

const DisplaySingleTownWithDetails = ({ cityList }) => {
  return (
    <>
      {cityList.map((item) => (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
          <div>hi</div>
          <div className="bg-red-500">hi</div>
        </div>
      ))}
    </>
  );
};

export default DisplaySingleTownWithDetails;
