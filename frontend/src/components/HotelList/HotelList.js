import React from "react";
import HotelCard from "../HotelCard/HotelCard";

const HotelList = ({ hotels }) => {
  if (!Array.isArray(hotels)) return null;

  return (
    <div>
      {hotels.map((hotel) => {
        return <HotelCard hotel={hotel} />;
      })}
    </div>
  );
};

export default HotelList;
