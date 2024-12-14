import React from "react";
import landingPage from "../../assets/images/hero_1.jpg";

const LandingPage = () => {
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
              Welcome to TripHeaven
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 sm:mt-4">
              Discover the best places for your next adventure.
            </p>
          </div>
        </div>
      </div>
      hi
    </div>
  );
};

export default LandingPage;
