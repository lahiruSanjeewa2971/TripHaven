import React, { useEffect, useState } from "react";
import destinationPage from "../../../assets/images/destination.jpg";
import { getDestinationListWithCityName } from "@/restAPI/DestinationAPI";
import { Loader } from "lucide-react";
import SingleDestination from "./SingleDestination";

const Destinations = () => {
  const [loading, setLoading] = useState(false);
  const [destinationsList, setDestinationsList] = useState([]);

  const fetchDestinationsList = async () => {
    try {
      setLoading(true);
      const response = await getDestinationListWithCityName();
      // console.log("getDestinationListWithCityName :", response);
      if (response.success) {
        setDestinationsList(response?.data);
      } else {
        setDestinationsList([]);
      }
    } catch (error) {
      console.log("Error in fetchDestinationsList :", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinationsList();
  }, []);

  return (
    <div className="mb-[-0.3rem] bg-[#beb3a3]">
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${destinationPage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <h1 className="font-bold font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
              Next Destination
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4 font-playwrite">
              Discover your next adventure with our curated list of must-visit
              destinations.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:px-13 md:px-16 lg:px-48">
        <div className="flex flex-col justify-center items-center py-14">
          <div className="flex items-center justify-center text-center">
            <h1 className="text-5xl font-bold font-playwrite text-center">
              Destinations.
            </h1>
          </div>

          <div className="mt-10 w-full">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 mt-5">
                <Loader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            ) : destinationsList && destinationsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {destinationsList.map((item, index) => (
                  <div className="relative w-full border-b" key={index}>
                    <div className="w-full h-[300px] rounded-lg shadow-lg overflow-hidden">
                      <div className="absolute z-10 py-2 px-4 sm:px-6 lg:px-14 text-white bg-gradient-to-r from-black/80 to-black/40 top-0 rounded-md w-full">
                        <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-center">
                          {item.destinationName}
                        </h2>
                      </div>

                      <div className="overflow-hidden h-2/3">
                        <img
                          src={item.image}
                          alt={item.destinationName}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-gray-800 text-lg leading-relaxed">
                          City : {item.town.townName}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-800 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="flex items-center justify-center mt-5">
                No data
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
