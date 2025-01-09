import React from "react";

const SingleDestination = ({ data }) => {
  return (
    <div className="relative w-full border-b">
      {/* <div className="font-playwrite text-3xl">
            <h2>{data.town.townName}</h2>
        </div> */}
      <div className="w-full min-h-[350px] rounded-lg shadow-lg overflow-hidden">
        <div className="absolute z-10 py-2 px-14 text-white bg-gradient-to-r from-black/80 to-black/40 top-4 left-4 rounded-md">
          <h2 className="text-lg font-bold">{data.destinationName}</h2>
        </div>
        <div className="overflow-hidden">
          <img
            src={data.image}
            alt={data.destinationName}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4 ">
          <p className="text-gray-800 text-lg leading-relaxed">
            CITY : {data.town.townName}
          </p>
        </div>
      </div>
      <div className="p-4 ">
        <p className="text-gray-800 text-lg leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default SingleDestination;
