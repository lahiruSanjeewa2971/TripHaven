import React from "react";
import restaurantPage from "../../../assets/images/restaurant03.jpg";
import restaurantPageHeader from "../../../assets/images/restaurant-header.jpg";

const Restaurants = () => {
  return (
    <div className="mb-[-0.2rem]">
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
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4">
              Embark on a culinary adventure with the finest dining spots.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:px-13 md:px-16 lg:px-48">
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
            <p className="leading-relaxed  mt-3">
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
    </div>
  );
};

export default Restaurants;
