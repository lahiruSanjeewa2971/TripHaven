import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LandingPageCommonLayout from "./components/Landing/common-layout";
import AuthPage from "./pages/auth";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/traveller" element={<LandingPageCommonLayout />}>
          <Route path="" element={<LandingPage />} />
          {/* <Route path="home" element={<LandingPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
