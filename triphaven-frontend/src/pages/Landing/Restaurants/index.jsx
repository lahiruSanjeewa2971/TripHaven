import React, { useEffect, useState } from "react";
import restaurantPage from "../../../assets/images/restaurant03.jpg";
import restaurantPageHeader from "../../../assets/images/restaurant-header.jpg";
import { getCitiesList, getCitiesWithRestaurantsList } from "@/restAPI/CityAPI";
import { toast } from "react-toastify";
import { ArrowUpDownIcon, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Restaurants = () => {
  const [loading, setLoading] = useState(false);
  const [townWithRestaurantList, setTownWithRestaurantList] = useState([]);
  const [tempTownWithRestaurantList, setTempTownWithRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterTownsList, setFilterTownsList] = useState([]);
  const [filterValue, setFilterValue] = useState(null);

  const fetchTownWithRestaurants = async () => {
    try {
      setLoading(true);
      const response = await getCitiesWithRestaurantsList();
      if (response.success) {
        setTownWithRestaurantList(response.data);
        setTempTownWithRestaurantList(response.data);
      } else {
        setTownWithRestaurantList([]);
        setTempTownWithRestaurantList([]);
      }
    } catch (error) {
      console.log("Error in fetchTownWithRestaurants :", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTownListToDisplayFilters = async () => {
    try {
      const response = await getCitiesList();
      // console.log("getCitiesList :", response);
      if (response.success) {
        const cityDataFotFilterList = response?.data?.map((single, index) => {
          return { id: single?._id, label: single?.townName };
        });
        console.log("cityDataFotFilterList :", cityDataFotFilterList);
        setFilterTownsList(cityDataFotFilterList);
      } else {
        setFilterTownsList([]);
      }
    } catch (error) {
      setFilterTownsList([]);
      console.log("Error in fetchTownListToDisplayFilters : ", error);
    }
  };

  const handleSearch = (inputValue) => {
    setSearchText(inputValue);
    if(inputValue.length > 0){
      const filteredData = tempTownWithRestaurantList.filter((restaurant) => 
        restaurant.restaurantName.toLowerCase().includes(inputValue.toLowerCase())
      )
      setTownWithRestaurantList(filteredData)
    } else{
      setTownWithRestaurantList(tempTownWithRestaurantList)
    }
  };

  const fetchAllRestaurantsBasedOnTownName = async (filterValue) => {
    console.log("fetchRestaurants");
    const query = new URLSearchParams({
      filterBy: filterValue,
    });
    console.log("fetchRestaurants | query :", query);

    try {
      // setLoading(true)
      const response = await fetchAllRestaurantsBasedOnTownName(query);
      console.log("fetchRestaurants after filter :", response);
    } catch (error) {
      // setLoading(false)
      console.log("Error in fetchAllRestaurantsBasedOnTownName :", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchTownWithRestaurants();
  }, []);

  useEffect(() => {
    fetchTownListToDisplayFilters();
  }, []);

  useEffect(() => {
    console.log("filterValue :", filterValue);
    if (filterValue !== null) {
      fetchAllRestaurantsBasedOnTownName(filterValue);
    }
  }, [filterValue]);

  return (
    <div className="mb-[-0.3rem] bg-[#cee0eb] overflow-hidden">
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen w-full"
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
        <div className="py-14 flex items-center justify-center flex-col">
          <h1 className="md:text-5xl sm:text-4xl text-xl font-bold font-playwrite text-center">
            Our Restaurants.
          </h1>
          <div className="my-5 sm:w-3/4 w-full px-4 flex sm:flex-row flex-col gap-3">
            <Input
              type="text"
              className="w-full border-none bg-white text-black rounded-xl"
              placeholder="Search Restaurants..."
              value={searchText}
              onChange={(event) => handleSearch(event.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="font-medium">Filter By Town</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={filterValue}
                  onValueChange={(value) => setFilterValue(value)}
                >
                  {filterTownsList.map((singleTown) => (
                    <DropdownMenuRadioItem
                      value={singleTown?.id}
                      key={singleTown?.id}
                    >
                      {singleTown?.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {loading ? (
            <div className="flex items-center justify-center space-x-2 mt-5">
              <Loader className="animate-spin w-5 h-5" />
              <span>Loading...</span>
            </div>
          ) : townWithRestaurantList && townWithRestaurantList.length > 0 ? (
            <>
              <div className="my-4 w-full grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:px-32 sm:px-20 px-10 items-center gap-5">
                {townWithRestaurantList.map((singleRestaurant, index) => (
                  <div
                    key={index}
                    className="rounded-xl flex flex-col items-center lg:h-[500px] md:h-[500px] h-[500px] overflow-hidden transition-all duration-200 hover:p-2 cursor-pointer"
                  >
                    <div className="w-full h-3/5">
                      <img
                        src={singleRestaurant?.image}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative flex flex-col justify-center items-center bg-white w-full h-2/5">
                      <div className="absolute top-1 uppercase w-full flex justify-center">
                        <span className="bg-black text-white rounded-xl text-center p-2 w-4/5 xl:text-sm lg:text-sm md:text-base sm:text-base text-sm">
                          {singleRestaurant?.restaurantName}
                        </span>
                      </div>
                      <div className="mt-2 text-center flex items-center">
                        <span>
                          Located in {singleRestaurant?.town.townName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <span key={starIndex}>
                            {starIndex < singleRestaurant.rating ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-yellow-500"
                              >
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.978 1.432 8.279L12 18.897l-7.368 4.666 1.432-8.279L.587 9.306l8.332-1.151z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-300"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                                />
                              </svg>
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="text-center">
                        <span className="text-center font-playwrite">
                          Special in {singleRestaurant?.cuisine} foods
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="bg-red-600 rounded-xl flex justify-center">hi</div>
              <div className="bg-red-600">hi</div>
              <div className="bg-red-600">hi</div>
              <div className="bg-red-600">hi</div> */}
              </div>
            </>
          ) : (
            // <div className="mt-5 w-full flex flex-wrap justify-center sm:justify-start border-b">
            //   {townWithRestaurantList.map((town, index) => (
            //     <div key={index} className="mb-10">
            //       <h2 className="text-2xl font-semibold px-32 ">
            //         {town.townName}
            //       </h2>
            //       {town.restaurants.length > 0 ? (
            //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 ">
            //           {town.restaurants.map((restaurant) => (
            //             <Card
            //               key={restaurant._id}
            //               className="h-[350px] relative overflow-hidden "
            //             >
            //               <img
            //                 alt={restaurant.restaurantName}
            //                 src={restaurant.image}
            //                 className="absolute inset-0 w-full h-full object-cover transition-transform transform hover:scale-110"
            //               />
            //               <div className="relative z-10 w-full h-full bg-black/30 text-white p-6 flex flex-col justify-end">
            //                 <div className="absolute top-5 left-6 right-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            //                   <p className="text-lg font-semibold">
            //                     {restaurant.restaurantName}
            //                   </p>
            //                   <p className="text-sm">
            //                     <strong>Rating:</strong> {restaurant.rating} ⭐
            //                   </p>
            //                 </div>

            //                 <p className="mt-6 text-sm sm:text-base">
            //                   {restaurant.description}
            //                 </p>
            //               </div>
            //             </Card>
            //           ))}
            //         </div>
            //       ) : (
            //         <p className="text-gray-500 mt-2">
            //           No restaurants available in this town.
            //         </p>
            //       )}
            //     </div>
            //   ))}
            // </div>
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
