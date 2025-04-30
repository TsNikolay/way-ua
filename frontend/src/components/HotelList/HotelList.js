import React, { useState } from "react";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./HotelList.module.css";

const HotelList = ({ hotels }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  if (!Array.isArray(hotels)) return null;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8); // показывать ещё 6 при каждом нажатии
  };

  return (
    <>
      <div className={styles.list}>
        {hotels.slice(0, visibleCount).map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.place_id} />
        ))}
      </div>
      {visibleCount < hotels.length && (
        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Show More
        </button>
      )}
    </>
  );
};

export default HotelList;
