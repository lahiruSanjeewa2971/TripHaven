import React, { useEffect, useState } from "react";
import restaurantPage from "../../../assets/images/restaurant03.jpg";
import restaurantPageHeader from "../../../assets/images/restaurant-header.jpg";
import { getCitiesWithRestaurantsList } from "@/restAPI/CityAPI";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";

const Restaurants = () => {
  const [loading, setLoading] = useState(false);
  const [townWithRestaurantList, setTownWithRestaurantList] = useState([]);

  const fetchTownWithRestaurants = async () => {
    try {
      setLoading(true);
      const response = await getCitiesWithRestaurantsList();
      console.log(response);
      if (response.success) {
        const filterNoRestaurants = response.data.filter(
          (item) => item.restaurants.length > 0
        );
        // console.log("hi ", filterNoRestaurants);
        setTownWithRestaurantList(filterNoRestaurants);
      } else {
        setTownWithRestaurantList([]);
      }
    } catch (error) {
      console.log("Error in fetchTownWithRestaurants :", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTownWithRestaurants();
  }, []);

  return (
    <div className="mb-[-0.3rem] bg-[#cee0eb]">
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
        style={{
          backgroundImage: `url(${restaurantPage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <h1 className="font-bold font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
              Taste the Journey
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4 font-playwrite">
              Embark on a culinary adventure with the finest dining spots.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:px-13 md:px-16 lg:px-48 bg-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="sm:w-1/2 sm:block hidden">
            <img
              src={restaurantPageHeader}
              alt="A vibrant local restaurant"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="sm:w-1/2 flex flex-col sm:text-start text-center">
            <h2 className="font-bold text-2xl">Welcome to TripHeaven</h2>
            <p className="leading-relaxed  mt-3 font-playwrite">
              Welcome, traveler! As you explore the vibrant cities of our land,
              let your taste buds embark on a journey of their own. From cozy
              local eateries to iconic dining spots, we've gathered the best
              restaurants each city has to offer. Whether you're craving
              traditional flavors or unique culinary delights, this is your
              guide to savoring the heart and soul of every destination.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-200 to-[#000000]">
      {/* <div className="w-full"> */}
        <div className="py-14 flex items-center justify-center flex-col">
          <h1 className="text-5xl font-bold font-playwrite">Our Restaurants.</h1>

          {loading ? (
            <div className="flex items-center justify-center space-x-2 mt-5">
              <Loader className="animate-spin w-5 h-5" />
              <span>Loading...</span>
            </div>
          ) : townWithRestaurantList && townWithRestaurantList.length > 0 ? (
            <div className="mt-5 w-full flex flex-wrap justify-center sm:justify-start border-b">
              
              {townWithRestaurantList.map((town, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-2xl font-semibold px-32 ">
                    {town.townName}
                  </h2>
                  {town.restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 ">
                      {town.restaurants.map((restaurant) => (
                        <Card
                          key={restaurant._id}
                          className="h-[350px] relative overflow-hidden "
                        >
                          <img
                            alt={restaurant.restaurantName}
                            src={restaurant.image}
                            className="absolute inset-0 w-full h-full object-cover transition-transform transform hover:scale-110"
                          />
                          <div className="relative z-10 w-full h-full bg-black/30 text-white p-6 flex flex-col justify-end">
                            <div className="absolute top-5 left-6 right-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                              <p className="text-lg font-semibold">
                                {restaurant.restaurantName}
                              </p>
                              <p className="text-sm">
                                <strong>Rating:</strong> {restaurant.rating} ⭐
                              </p>
                            </div>

                            <p className="mt-6 text-sm sm:text-base">
                              {restaurant.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">
                      No restaurants available in this town.
                    </p>
                  )}
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
  );
};

export default Restaurants;


{
  /**
   * const destinationArray = [
  { _id: "1", image: "image1.jpg" },
  { _id: "2", image: "image2.jpg" },
  { _id: "3", image: "image3.jpg" },
  { _id: "4", image: "image4.jpg" },
];

const GridComponent = () => {
  // Define colSpan and rowSpan based on position or predefined rules
  const gridPositions = [
    { colSpan: 3, rowSpan: 4 },
    { colSpan: 3, rowSpan: 3 },
    { colSpan: 2, rowSpan: 3 },
    { colSpan: 3, rowSpan: 5 },
  ];

  return (
    <div className="w-full p-6 h-full grid grid-cols-6 grid-rows-9 gap-3 mt-2">
      {destinationArray.map((item, index) => {
        const position = gridPositions[index] || { colSpan: 1, rowSpan: 1 }; // Fallback for extra items
        return (
          <div
            key={item._id}
            className={`col-span-${position.colSpan} row-span-${position.rowSpan} flex items-center justify-center overflow-hidden rounded-[5%]`}
          >
            <img
              src={item.image}
              alt={`Destination ${item._id}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;

   */
}