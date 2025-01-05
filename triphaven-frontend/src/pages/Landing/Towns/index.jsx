import React, { useEffect, useState } from "react";
import landingPage from "../../../assets/images/login01.jpg";
import { getCitiesList } from "@/restAPI/CityAPI";
import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DisplaySingleTownWithDetails from "./DisplaySingleTownWithDetails";
import { Button } from "@/components/ui/button";

const Towns = () => {
  const [cityList, setCityList] = useState([]);
  const [topCityList, setTopCityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCityList = async () => {
    setLoading(true);
    try {
      const response = await getCitiesList();
      // console.log("city list :", response);
      if (response.success) {
        setCityList(response?.data);

        // get top 3 rated cities | sorted by rating.
        const topCity = response.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setTopCityList(topCity);
      } else {
        setCityList([]);
      }
    } catch (error) {
      setCityList([]);
      console.log("error in fetch city list :", error);
      // toast.error("")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCityList();
  }, []);

  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${landingPage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <h1 className="font-bold font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
              Best Cities
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4">
              Discover the best places for your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100">
        <div className="p-3 sm:p-13 md:p-16 lg:p-32">
          <div className="flex items-center justify-center text-center">
            <h1 className="font-bold text-3xl capitalize text-primary">
              Top most famous Cities.
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mt-6">
            <div>
              <img
                src={topCityList[0].image}
                alt={topCityList[0].townName}
                className="inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-justify text-gray-700 leading-relaxed text-lg">
                {topCityList[0].description}
              </p>
              <Button className="p-3 w-full ">See Hotels</Button>
            </div>
          </div>

          {/* Render City List */}
          <div className="flex items-center justify-center text-center mt-10">
            <h1 className="font-bold text-3xl capitalize text-primary">
              Cities List.
            </h1>
          </div>

          <div className="w-full">
            {loading ? (
              <div className="flex items-center justify-center space-x-2 mt-5">
                <Loader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            ) : cityList && cityList.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {cityList.map((item) => (
                  <Card
                    key={item._id}
                    className="w-[400px] h-[300px] relative overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={item.image}
                      alt={item.townName}
                      className="absolute inset-0 w-full h-full object-cover "
                    />
                    <div className="relative z-10 w-full h-full bg-black/30 text-white p-6 flex flex-col justify-end">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          {item.townName}
                        </CardTitle>
                      </CardHeader>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <span className="flex items-center justify-center mt-5">
                No data
              </span>
            )}
            {/* {loading ? (
              <div className="flex items-center justify-center space-x-2 mt-5">
                <Loader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            ) : cityList && cityList.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <DisplaySingleTownWithDetails cityList={cityList} />
              </div>
            ) : (
              <span className="flex items-center justify-center mt-5">
                No data
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Towns;
