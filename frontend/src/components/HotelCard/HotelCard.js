import React, { useContext } from "react";
import styles from "./HotelCard.module.css";
import PlannerFormContext from "../../contexts/PlannerFormContext";

const HotelCard = ({ hotel }) => {
  const { setSelectedHotel, selectedHotel } = useContext(PlannerFormContext);
  const isAnySelected = !!selectedHotel;
  const isSelected = selectedHotel?.place_id === hotel.place_id;

  const selectHotel = (hotel) => {
    selectedHotel
      ? hotel.place_id === selectedHotel.place_id
        ? setSelectedHotel(null)
        : setSelectedHotel(hotel)
      : setSelectedHotel(hotel);
  };

  return (
    <div
      onClick={() => {
        selectHotel(hotel);
      }}
      className={`
        ${styles.card}
        ${
          isAnySelected
            ? isSelected
              ? styles.selected
              : styles.notSelected
            : ""
        }
      `}
    >
      <img
        className={styles.image}
        src={hotel.imageUrl || "/images/default-hotel.png"}
        alt={hotel.name}
        onError={(e) => {
          e.target.src = "/images/default-hotel.png";
        }}
      />

      <h2>{hotel.name}</h2>
      <h3>📍{hotel.address}</h3>
      <h3>⭐{hotel.rating}</h3>
      <div
        className={styles.attribution}
        dangerouslySetInnerHTML={{ __html: hotel.attribution }}
      />
    </div>
  );
};

export default HotelCard;
