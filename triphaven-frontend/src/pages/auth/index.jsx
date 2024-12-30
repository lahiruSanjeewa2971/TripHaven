import React, { useState } from "react";
import loginImage from "../../assets/images/login02.jpg";
// import loginImage from "../../assets/images/login01.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonForm from "@/components/common-form";
import { signInFormControls, signUpFormControls } from "@/config";
import { toast, ToastContainer } from "react-toastify";
import { loginUser, registerUser } from "@/restAPI/AuthRestAPI";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const checkIfSignInFormIsValid = () => {
    return (
      signInFormData &&
      signInFormData.email !== "" &&
      signInFormData.password !== ""
    );
  };

  const checkIfSignUpFormIsValid = () => {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.email !== "" &&
      signUpFormData.password !== ""
    );
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    // console.log("data :", signInFormData);

    if (
      signInFormData.password === null ||
      signInFormData.password === "" ||
      signInFormData.password.length < 4
    ) {
      toast.warning("Invalid password. Please enter a valid password.");
      return;
    }
    dispatch(loginStart());
    try {
      const response = await loginUser(signInFormData);
      if (response.success) {
        const payload = {
          token: response?.data?.accessToken,
          role: response?.data?.user?.role,
          data: response?.data?.user,
        };
        dispatch(loginSuccess(payload));
        toast.success(`${response?.message}`);
        if (response?.data?.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/traveller");
        }
      } else {
        toast.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(loginFailure(error.message));
      toast.error(`Login failed: ${error.message}`);
    }
  };
  
  const handleRegisterUser = async (event) => {
    try {
      event.preventDefault();
      if (!checkIfSignUpFormIsValid()) {
        toast.warning("Please fill the form before register.");
      } else if (
        signUpFormData.password === null ||
        signUpFormData.password === "" ||
        signUpFormData.password.length < 4
      ) {
        toast.warning("Invalid password. Please enter a valid password.");
      } else {
        const response = await registerUser(signUpFormData)
        if(response.success){
          toast.success(`${response?.message}`);
          navigate("/traveller");
        } else {
          toast.error("Register failed");
        }
      }
    } catch (error) {
      console.error("Register failed:", error);
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div
        className="w-full h-screen grid sm:grid-cols-12"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="md:col-span-7 md:block hidden relative bg-cover bg-center bg-no-repeat min-h-screen w-full">
          {/* <img src={loginImage} alt="" className="w-full h-full object-cover" /> */}
        </div>

        <div className="md:col-span-5 col-span-12 flex flex-col p-6 h-screen">
          {/* Header Section */}
          <div className="w-full flex items-center justify-start p-4">
            <header className="px-4 md:hidden flex items-center border-b border-gray-300 w-full">
              <span className="font-bold font-poppins text-lg text-gray-800">
                TripHaven
              </span>
            </header>
          </div>

          {/* Tabs Section */}
          <div className="flex flex-1 items-center justify-center">
            <div
              className="w-full max-w-md shadow-md rounded-lg p-6 bg-white opacity-90"
              style={{ borderRadius: "3%" }}
            >
              <Tabs
                value={activeTab}
                defaultValue="signin"
                onValueChange={handleTabChange}
                className="w-full"
              >
                {/* Tabs List */}
                <TabsList className="flex justify-between bg-gray-100 rounded-md p-1">
                  <TabsTrigger
                    value="signin"
                    className="w-1/2 text-center py-2 font-medium text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="w-1/2 text-center py-2 font-medium text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent value="signin">
                  <Card className="p-6 space-y-4 rounded-md ">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        Sign in to your account
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CommonForm
                        formControls={signInFormControls}
                        buttonText={"Sign In"}
                        formData={signInFormData}
                        setFormData={setSignInFormData}
                        isButtonDisabled={!checkIfSignInFormIsValid()}
                        handleSubmit={handleLoginUser}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="signup">
                  <Card className="p-6 space-y-4 bg-gray-50 rounded-md shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        Create a new account
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CommonForm
                        formControls={signUpFormControls}
                        buttonText={"Sign Up"}
                        formData={signUpFormData}
                        setFormData={setSignUpFormData}
                        isButtonDisabled={!checkIfSignUpFormIsValid()}
                        handleSubmit={handleRegisterUser}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Welcome Back
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </div> */}
        {/* </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
