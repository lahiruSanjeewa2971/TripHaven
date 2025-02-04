import "leaflet/dist/leaflet.css";
import {
  getCityImagesFromUnsplash,
  getMapDataForGivenLocation,
} from "@/restAPI/openAPI";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";

const MapViewForLocation = ({ fullDetailsOfDestination }) => {
  const [position, setPosition] = useState(null);
  const [cityImagesFromUnsplash, setCityImagesFromUnsplash] = useState(null);

  const fetchCityImagesFromUnsplash = async (fullDetailsOfDestination) => {
    if (fullDetailsOfDestination) {
      try {
        const response = await getCityImagesFromUnsplash(
          fullDetailsOfDestination
        );
        // console.log('fetchCityImagesFromUnsplash', response);
        if (response.status === 200) {
          // const data = await response.json()
          setCityImagesFromUnsplash(response.data.results);
          console.log("data.results :", response.data.results);
        } else {
          setCityImagesFromUnsplash(null);
        }
      } catch (error) {
        setCityImagesFromUnsplash(null);
        console.log("Error in fetchCityImagesFromUnsplash :", error);
      }
    }
  };

  const fetchMapDataForGivenLocation = async (fullDetailsOfDestination) => {
    try {
      const locationData = await getMapDataForGivenLocation(
        fullDetailsOfDestination
      );
      console.log("fetchMapDataForGivenLocation locationData :", locationData);
      if (locationData.data.length > 0) {
        setPosition([
          parseFloat(locationData.data[0].lat),
          parseFloat(locationData.data[0].lon),
        ]);
      } else {
        setPosition(null);
      }
    } catch (error) {
      console.log("error in fetchMapDataForGivenLocation: ", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    console.log("fullDetailsOfDestination | map :", fullDetailsOfDestination);

    if (fullDetailsOfDestination && isMounted) {
      fetchMapDataForGivenLocation(fullDetailsOfDestination);
      //   fetchCityImagesFromUnsplash(fullDetailsOfDestination);
    }
    return () => {
      isMounted = false;
    };
  }, [fullDetailsOfDestination]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {/* Ensure the container takes full available space */}
      <div className="w-full h-full">
        {position ? (
          <MapContainer
            key={position.toString()}
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%", zIndex: 10 }} // Ensures MapContainer takes full space
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>{fullDetailsOfDestination}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center">
            <p>📍 Loading map or location not found...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapViewForLocation;
