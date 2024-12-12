import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LandingPageCommonHeader from "./header";

const LandingPageCommonLayout = () => {
  const location = useLocation();
  return (
    <div>
      <LandingPageCommonHeader />
      <main className="mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingPageCommonLayout;
