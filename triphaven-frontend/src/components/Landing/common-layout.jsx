import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LandingPageCommonHeader from "./header";
import Footer from "./footer";

const LandingPageCommonLayout = () => {
  const location = useLocation();
  return (
    <div>
      <LandingPageCommonHeader />
      {/* <main className="mt-5"> */}
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPageCommonLayout;
