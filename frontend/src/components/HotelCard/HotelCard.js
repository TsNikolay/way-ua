import React, { useContext } from "react";
import styles from "./HotelCard.module.css";
import PlannerFormContext from "../../contexts/PlannerFormContext";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const { place_id, name, imageUrl, address, rating, attribution } = hotel;
  const { setSelectedHotel, selectedHotel } = useContext(PlannerFormContext);
  const isAnySelected = !!selectedHotel;
  console.log(selectedHotel);
  const isSelected = selectedHotel?.place_id === place_id;

  const selectHotel = (hotel) => {
    selectedHotel
      ? place_id === selectedHotel.place_id
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
        src={imageUrl || "/images/default-hotel.png"}
        alt={name}
        onError={(e) => {
          e.target.src = "/images/default-hotel.png";
        }}
      />
      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${name} ${address}`}
          target="_blank"
        >
          <CiCircleMore
            className={styles.more}
            onClick={(e) => {
              e.stopPropagation(); //щоб не спрацьовував onClick для вибору готелю
            }}
          />
        </Link>
      </div>
      <h3>
        📍<i>{address}</i>
      </h3>
      <h3>⭐{rating}</h3>

      <div
        className={styles.attribution}
        dangerouslySetInnerHTML={{ __html: attribution }}
      />
    </div>
  );
};

export default HotelCard;
