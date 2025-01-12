import React, { useEffect, useState } from "react";
import landingPage from "../../assets/images/hero_1.jpg";
import welcomePartImage from "../../assets/images/img_2.jpg";
import { Button } from "@/components/ui/button";
import PhotoGallary from "./photoGallary";
import TopPlaces from "./topPlaces";
import { toast } from "react-toastify";
import { getCitiesList } from "@/restAPI/CityAPI";
import { Loader } from "lucide-react";

const tempserFeedbacks = [
  {
    _id: 1,
    userName: "User 1",
    title: "Amazing",
    feedback:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    rating: 5,
  },
  {
    _id: 2,
    userName: "User 2",
    title: "Thanks",
    feedback:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    rating: 4,
  },
  {
    _id: 3,
    userName: "User 3",
    title: "My new travel buddy",
    feedback:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    rating: 5,
  },
];

const LandingPage = () => {
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCityList = async () => {
    setLoading(true);
    try {
      const response = await getCitiesList();
      console.log("city list :", response);
      if (response.success) {
        setCityList(response?.data);
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
        {/* inset-0 : This is commonly used to make an element fill its parent container or to position it absolutely or relatively at all edges. */}
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <h1 className="font-bold font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
              Welcome to TripHeaven
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4 font-playwrite">
              Discover the best places for your next adventure.
            </p>
          </div>
        </div>
      </div>

      {/* welcome to website part */}
      {/* <div className="bg-background w-full h-screen flex flex-col gap-4 sm:grid sm:grid-cols-2 items-center justify-center p-3 sm:p-13 md:p-16 lg:p-32"> */}
      {/* <div className="flex flex-col items-center justify-center"> */}
      {/* <div>
            <img src={welcomePartImage} alt="welcomePartImage" className="w-full h-full bg-cover bg-center bg-no-repeat" />
            </div>
            <div>text</div> */}
      {/* </div> */}
      {/* </div> */}
      <div
        className="relative h-[500px] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${welcomePartImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="text-white space-y-4 p-3 sm:p-13 md:p-16 lg:p-32 mb-10">
            <h2 className="text-5xl font-bold font-playwrite">
              Welcome To Our Website
            </h2>
            <p className="text-lg">
              Discover the most beautiful and captivating places around the
              world with us. Whether you're planning your next adventure or
              simply exploring from the comfort of your home, our platform
              offers stunning destinations, hidden gems, and travel tips to
              inspire your journey.
            </p>
            <p className="text-lg">
              Let us help you find the perfect place to relax, explore, and
              create unforgettable memories.
            </p>
            <Button
              style={{ borderRadius: "0.375rem" }}
              className="w-full sm:w-40 border rounded-md"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Top rated 3 places */}
      {/* <div className="bg-topPlacesBackgroundColor text-white "> */}
      <div className="bg-gradient-to-b from-[#B1B2A6] to-[#F5F5F5] text-white ">
        <div className="p-3 sm:p-13 md:p-16 lg:p-32">
          <div className="flex items-center justify-center py-6">
            <h2 className="text-3xl font-bold font-playwrite text-center">
              Here you can check most rated 3 cities in our list.
            </h2>
          </div>
          {loading ? (
            <>
              <div className="flex items-center justify-center  space-x-2">
                <Loader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            </>
          ) : cityList && cityList.length > 0 ? (
            <div
              className={`flex flex-col items-center justify-center gap-3
              ${
                cityList.length === 1
                  ? "sm:flex sm:items-center"
                  : cityList.length === 2
                  ? "sm:grid sm:grid-cols-2 sm:items-center"
                  : "sm:grid sm:grid-cols-3 sm:items-center"
              }
            `}
            >
              {cityList.map((singleCity) => (
                <>
                  <div>
                    <TopPlaces
                      singleCityDetails={singleCity}
                      key={singleCity._id}
                    />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              <span className="flex items-center justify-center ">No data</span>
            </>
          )}
        </div>
      </div>

      {/* Photo gallary */}
      <PhotoGallary />

      {/* feedbacks */}
      <div className="p-3 sm:p-13 md:p-16 lg:p-32">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-semibold capitalize p-2 pb-5 text-center font-playwrite">
            Hear It from Our Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tempserFeedbacks.map((singleFeedback) => (
              <div
                key={singleFeedback._id}
                className="p-4 border rounded shadow-md"
              >
                <h2 className="text-lg font-bold">{singleFeedback.title}</h2>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex}>
                      {starIndex < singleFeedback.rating ? (
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
                <p className="mt-2 text-gray-600 flex justify-start">{singleFeedback.feedback}</p>
                <span className="block mt-2 text-sm text-gray-500">
                  — {singleFeedback.userName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
