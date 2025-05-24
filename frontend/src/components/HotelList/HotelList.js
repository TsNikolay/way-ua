import React, { useState } from "react";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./HotelList.module.css";
import { useTranslation } from "react-i18next";

const HotelList = ({ hotels }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const { t } = useTranslation();
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
          {t("hotelsattractionspage.show_more")}
        </button>
      )}
    </>
  );
};

export default HotelList;
