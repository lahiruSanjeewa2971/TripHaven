import { Card, CardContent, CardTitle } from "@/components/ui/card";

const TopPlaces = ({ singleCityDetails }) => {
  return (
    <div className="flex items-center justify-center">
      <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300 w-[300px] sm:w-full h-[400px]  border-none">
        <CardContent className="flex flex-col items-center gap-4 p-4">
          {/* Image as background spanning full width */}
          <div className="w-full h-48 rounded-lg overflow-hidden relative">
            <img
              src={singleCityDetails.image}
              alt={singleCityDetails.townName || "Place image"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Title below the image */}
          <div className="text-gray-600 font-bold text-center mt-4 text-2xl">
            <CardTitle>{singleCityDetails.townName}</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mb-1 line-clamp-5 ">
            <span className="font-bold">{singleCityDetails.description}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPlaces;