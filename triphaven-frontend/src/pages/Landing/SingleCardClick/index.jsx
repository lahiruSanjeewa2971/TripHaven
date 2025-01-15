import CommonForm from "@/components/common-form";
import { userFeedbackForDestinationFormControls } from "@/config";
import { getDestinationDetailsById } from "@/restAPI/DestinationAPI";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const tempFeedbacks = [
  {
    _id: 1,
    rating: 4,
    comment:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    destination: "1",
    userName: "User 1",
  },
  {
    _id: 2,
    rating: 5,
    comment:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    destination: "1",
    userName: "User 2",
  },
  {
    _id: 1,
    rating: 5,
    comment:
      "Discover the most beautiful and captivating places around the world with us. Whether you're planning your next adventure or simply exploring from the comfort of your home, our platform offers stunning destinations, hidden gems, and travel tips to inspire your journey. Let us help you find the perfect place to relax, explore, and create unforgettable memories.",
    destination: "1",
    userName: "User 3",
  },
];

const FullViewOfSingleCard = () => {
  const { itemId } = useParams();
  const [fullDetailsOfDestination, setFullDetailsOfDestination] = useState({});
  const [loading, setLoading] = useState(false);
  const [userFeedbackData, setUserFeedbackData] = useState({
    rating: "",
    comment: "",
  });

  const fetchFullDataofSingleDestination = async (itemId) => {
    setLoading(true);
    try {
      const response = await getDestinationDetailsById(itemId);
      console.log("getDestinationDetailsById :", response);
      setFullDetailsOfDestination(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in fetchFullDataofSingleDestination :", error);
      toast.error("Something went wrong.");
    }
  };

  const handleSendUserFeedback = () => {
    try {
      console.log("Clicked handleSendUserFeedback");
    } catch (error) {
      console.log("Error in handleSendUserFeedback :", error);
      toast.error("Failed to submit feedback.");
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchFullDataofSingleDestination(itemId);
    }
  }, [itemId]);
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
                          <CommonForm
                            formControls={
                              userFeedbackForDestinationFormControls
                            }
                            buttonText={"Place"}
                            formData={userFeedbackData}
                            setFormData={setUserFeedbackData}
                            isButtonStyleDisabled={true}
                            handleSubmit={handleSendUserFeedback}
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
      <div className="lg:p-3 lg:px-32 md:p-3 md:px-16 sm:p-3 sm:px-3 p-3 w-full flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:w-3/5 w-full ">
          <h2 className="md:text-2xl text-xl font-semibold capitalize md:pt-4 p-2 pb-5 text-center font-playwrite">
            Hear It from Our Users
          </h2>

          <div className="w-full">
            {tempFeedbacks.length > 0 ? (
              <>
                {tempFeedbacks.map((singleFeedback, index) => (
                  <div
                    key={singleFeedback._id}
                    className="p-4 border rounded shadow-md mb-5 flex flex-col"
                  >
                    <p className="flex justify-start pb-3">
                      {singleFeedback.comment}
                    </p>

                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex}>
                          {starIndex < singleFeedback.rating ? (
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

                    <span className="pt-3">{singleFeedback.userName}</span>
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
        <div className="flex flex-col items-center w-2/5">
          {/* <h2 className="md:text-2xl text-xl font-semibold capitalize md:pt-4 p-2 pb-5 text-center font-playwrite">
            Hear It from Our Users
          </h2> */}
        </div>
      </div>
    </div>
  );
};

export default FullViewOfSingleCard;
