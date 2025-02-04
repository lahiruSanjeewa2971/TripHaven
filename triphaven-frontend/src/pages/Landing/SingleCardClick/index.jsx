import CommonForm from "@/components/common-form";
import CommonReusablaForm from "@/components/common-form/form(another-way)";
import { userFeedbackForDestinationFormControls } from "@/config";
import { getDestinationDetailsById } from "@/restAPI/DestinationAPI";
import {
  GetUserFeedbackOnDestination,
  PostUserFeedbackOnDestination,
} from "@/restAPI/FeedbackAPI";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MapViewForLocation from "../MapView";

const FullViewOfSingleCard = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [fullDetailsOfDestination, setFullDetailsOfDestination] = useState({});
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchFullDataofSingleDestination = async (itemId) => {
    setLoading(true);
    try {
      const response = await getDestinationDetailsById(itemId);

      setFullDetailsOfDestination(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in fetchFullDataofSingleDestination :", error);
      toast.error("Something went wrong.");
    }
  };

  const fetchUserFeedbackOnDestination = async (itemId) => {
    try {
      const response = await GetUserFeedbackOnDestination(itemId);
      // console.log("GetUserFeedbackOnDestination :", response);
      if (response.success) {
        setUserFeedbacks(response?.data);
      } else {
        setUserFeedbacks([]);
      }
    } catch (error) {
      console.log("Error in fetchUserFeedbackOnDestination :", error);
    }
  };

  // const handleSendUserFeedback = async (data) => {
  const handleFeedbackSend = async (data) => {
    // e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth", { state: { from: "/single-card" } });
      } else {
        setFormSubmitting(true);
        const feedbackPayload = {
          userId: userData?._id,
          feedback: data.comment,
          rating: data.rating,
          referenceId: itemId,
          referenceType: "destination",
        };

        const response = await PostUserFeedbackOnDestination(
          feedbackPayload,
          token
        );
        // console.log("feedback response:", response);
        if (response.success) {
          setFormSubmitting(false);
          toast.success("Your feedback was added.");
        } else {
          setFormSubmitting(false);
          // toast.error("Your feedback was not added.");
          // console.log(first)
        }
      }
    } catch (error) {
      console.log("Error in handleSendUserFeedback :", error);
      toast.error("Failed to submit feedback.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (itemId) {
      fetchFullDataofSingleDestination(itemId);
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId) {
      fetchUserFeedbackOnDestination(itemId);
    }
  }, [itemId, formSubmitting]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center ">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="animate-spin w-5 h-5" />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <div>
              {Object.keys(fullDetailsOfDestination).length > 0 ? (
                <>
                  <div>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      <div className="relative md:w-3/5 w-full overflow-hidden">
                        <span className="absolute md:top-0 md:left-0 top-0 left-0 bg-black/50 text-white lg:p-2 lg:px-10 md:p-1 md:px-10 p-1 px-5 rounded-br-2xl md:text-2xl text-lg">
                          {fullDetailsOfDestination.destinationName}
                        </span>
                        <img
                          src={fullDetailsOfDestination.image}
                          alt="image"
                          className="w-full h-full object-cover"
                          // onError={(e) => {
                          //   e.target.onerror = null;
                          //   e.target.src = "/path/to/default-image.jpg"; // Provide a fallback image
                          // }}
                        />
                      </div>
                      <div className="md:w-2/5 w-full flex flex-col justify-start p-4">
                        <div className="flex flex-col">
                          <h2 className="font-bold text-4xl font-playwrite capitalize">
                            {fullDetailsOfDestination.destinationName}
                          </h2>
                          <h3 className="font-medium text-xl pt-4">
                            City - {fullDetailsOfDestination.town.townName}
                          </h3>
                          <span className="pt-5 font-light">
                            {fullDetailsOfDestination.description}
                          </span>
                        </div>

                        <div className="py-4 pt-10">
                          <h1 className="text-2xl py-2">
                            Place your thoughts.
                          </h1>
                          <CommonReusablaForm
                            onSubmit={handleFeedbackSend}
                            formSubmitting={formSubmitting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex items-center justify-center">
                    No data
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* comment on the place */}
      <div className="lg:p-3 lg:pl-24 md:p-3 md:pl-14 sm:p-3 sm:px-3 p-3 w-full flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:w-3/5 w-full">
          <h2 className="md:text-2xl text-xl font-semibold capitalize md:pt-4 p-2 pb-5 text-center font-playwrite">
            Hear It from Our Users
          </h2>

          <div className="w-full">
            {userFeedbacks.length > 0 ? (
              <>
                {userFeedbacks.map((singleUserFeedback, index) => (
                  <div
                    key={singleUserFeedback._id}
                    className="p-4 border rounded shadow-md mb-5 flex flex-col bg-slate-200"
                  >
                    <p className="flex justify-start pb-3">
                      {singleUserFeedback.feedback}
                    </p>

                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex}>
                          {starIndex < singleUserFeedback.rating ? (
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

                    <span className="pt-3">
                      {singleUserFeedback?.userId?.userName}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <span className="flex items-center justify-start">
                  No comments on this destination
                </span>
              </>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col items-center w-2/5 bg-gray-500 h-[400px] self-start"> */}
        <div className="flex flex-col items-center md:w-2/5 w-full h-auto self-start">
          <MapViewForLocation
            fullDetailsOfDestination={fullDetailsOfDestination?.town?.townName}
          />
          {/* <h2 className="md:text-2xl text-xl font-semibold capitalize md:pt-4 p-2 pb-5 text-center font-playwrite">
            Hear It from Our Users
          </h2> */}
        </div>
      </div>
    </div>
  );
};

export default FullViewOfSingleCard;
