import React from "react";
import landingPage from "../../assets/images/hero_1.jpg";
import welcomePartImage from "../../assets/images/img_2.jpg";
import { Button } from "@/components/ui/button";
import PhotoGallary from "./photoGallary";

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
        {/* inset-0 : This is commonly used to make an element fill its parent container or to position it absolutely or relatively at all edges. */}
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
            <h2 className="text-4xl font-bold">Welcome To Our Website</h2>
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
            <Button style={{ borderRadius: '0.375rem' }} className="w-full sm:w-40 border rounded-md">Contact Us</Button>
          </div>
        </div>
      </div>

      {/* Top rated 4 places */}

      {/* Photo gallary */}
      <PhotoGallary/>

      {/* feedbacks */}
    </div>
  );
};

export default LandingPage;
