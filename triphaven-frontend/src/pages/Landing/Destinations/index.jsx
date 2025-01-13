import React, { useEffect, useState } from "react";
import destinationPage from "../../../assets/images/destination.jpg";
import { getDestinationListWithCityName } from "@/restAPI/DestinationAPI";
import { Loader } from "lucide-react";
import SingleDestination from "./SingleDestination";
import image1 from "../../../assets/images/login02.jpg";
import image2 from "../../../assets/images/city-page.jpg";
import image3 from "../../../assets/images/restaurant03.jpg";
import image4 from "../../../assets/images/restaurant02.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCitiesWithDestinationsList } from "@/restAPI/CityAPI";

const Destinations = () => {
  const navigation = useNavigate();
  const { cityId } = useParams();
  const [loading, setLoading] = useState(false);
  const [destinationsList, setDestinationsList] = useState([]);
  const [cityWithDestinations, setCityWithDestinations] = useState([]);

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

  const fetchCityWithDestinations = async (cityId) => {
    try {
      setLoading(true);
      const response = await getCitiesWithDestinationsList(cityId);
      console.log("fetchCityWithDestinations :", response);
      if (response.success) {
        setCityWithDestinations(response?.data);
      } else {
        setCityWithDestinations([]);
      }
    } catch (error) {
      console.log("Error in fetchDestinationsList :", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnClickOfSingleDestination = (singleDestination) => {
    // console.log("singleDestination :", singleDestination);
    navigation(`/single-card/${singleDestination?._id}`);
  };

  // useEffect(() => {
  //   fetchDestinationsList();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cityId) {
      fetchCityWithDestinations(cityId);
    } else {
      fetchDestinationsList();
    }
  }, [cityId]);

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

      {/* bento grid layout */}
      <div className="w-full md:h-[600px] h-[80vh] flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 md:h-full h-1/2 flex items-center justify-center">
          <div className="w-full p-6 h-full grid grid-cols-6 grid-rows-9 gap-3 mt-2">
            <div className="col-span-3 row-span-4 flex items-center justify-center overflow-hidden rounded-[5%]">
              <img src={image1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className=" col-span-3 row-span-1"></div>
            <div className="col-span-3 row-span-3 flex items-center justify-center overflow-hidden rounded-[5%]">
              <img src={image2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className=" col-span-1 row-span-3"></div>
            <div className="col-span-2 row-span-3 flex items-center justify-center overflow-hidden rounded-[5%]">
              <img src={image3} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-3 row-span-5 flex items-center justify-center overflow-hidden rounded-[5%]">
              <img src={image4} alt="" className="w-full h-full object-cover" />
            </div>
            <div className=" col-span-3 row-span-2"></div>
          </div>
        </div>

        {/* Right Section */}
        <div className=" w-full md:w-1/2 md:h-full flex items-center justify-center px-4">
          <p className="leading-relaxed mt-3 font-playwrite text-white md:text-xl">
            Welcome to the enchanting world of Sri Lanka, a land of diverse
            landscapes and timeless wonders. From pristine beaches and lush tea
            plantations to ancient ruins and vibrant cultural festivals, this
            island nation offers something for every traveler. Discover the
            unique beauty and stories behind each destination, as you embark on
            a journey to explore Sri Lanka's breathtaking sights and rich
            heritage. Let the adventure begin!
          </p>
        </div>
      </div>

      <div className="p-3 sm:px-13 md:px-16 lg:px-48">
        <div className="flex flex-col justify-center items-center py-14">
          <div className="flex items-center justify-center text-center">
            <h1 className="text-5xl font-bold font-playwrite text-center">
              {cityId
                ? `${cityWithDestinations?.town?.townName}`
                : "Destinations."}
            </h1>
          </div>

          <div className="mt-10 w-full">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 mt-5">
                <Loader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            ) : destinationsList && destinationsList?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {destinationsList.map((item, index) => (
                  <div
                    className="relative w-full border-b cursor-pointer"
                    key={index}
                    onClick={() => handleOnClickOfSingleDestination(item)}
                  >
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
            ) : cityId && cityWithDestinations?.destinations?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {cityWithDestinations?.destinations.map((item, index) => (
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
                          City : {cityWithDestinations?.town?.townName}
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
