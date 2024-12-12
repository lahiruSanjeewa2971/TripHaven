import { useState } from "react";
// import './App.css'
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LandingPageCommonLayout from "./components/ui/Landing/common-layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageCommonLayout/>} >
          <Route path="" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
