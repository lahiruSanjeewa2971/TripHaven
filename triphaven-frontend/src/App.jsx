import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LandingPageCommonLayout from "./components/Landing/common-layout";
import AuthPage from "./pages/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import AdminPage from "./components/admin";
import Towns from "./pages/Landing/Towns";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodeToken = jwtDecode(storedToken);
        const payload = {
          token: storedToken,
          role: decodeToken?.role,
          data: {
            _id: decodeToken._id,
            email: decodeToken.email,
            userName: decodeToken.userName,
            role: decodeToken.role,
          },
        };
        dispatch(loginSuccess(payload));
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/traveller" element={<LandingPageCommonLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="towns" element={<Towns />} />
          {/* <Route path="home" element={<LandingPage />} /> */}
        </Route>

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
