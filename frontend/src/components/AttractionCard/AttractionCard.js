import React, { useContext } from "react";
import styles from "./AttractionCard.module.css";
import { FaRegEye } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import PlannerFormContext from "../../contexts/PlannerFormContext";

const AttractionCard = ({ attraction }) => {
  const { place_id, name, address, photo_reference, rating, attribution } =
    attraction;

  const {
    addSelectedAttraction,
    selectedAttractions,
    removeSelectedAttraction,
  } = useContext(PlannerFormContext);

  const isSelected = selectedAttractions.some(
    (selectedAttraction) => selectedAttraction.place_id === place_id,
  );

  const selectAttraction = (attraction) => {
    selectedAttractions.some(
      (selectedAttraction) => selectedAttraction.place_id === place_id,
    )
      ? removeSelectedAttraction(attraction)
      : addSelectedAttraction(attraction);
  };
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div
      className={`
        ${styles.card}
        ${isSelected ? styles.selected : ""}
      `}
      onClick={() => {
        selectAttraction(attraction);
      }}
    >
      <div className={styles.image}>
        <img
          src={
            `${API_URL}/planner/image?photo_reference=${photo_reference}` ||
            "/images/default-attraction.png"
          }
          alt={name}
          onError={(e) => {
            e.target.src = "/images/default-attraction.png";
          }}
        />
      </div>
      <div className={styles.info}>
        <h2>{name}</h2>
        <h3>
          📍<i>{address}</i>
        </h3>
        <h3>⭐{rating}</h3>
        <div
          className={styles.attribution}
          dangerouslySetInnerHTML={{ __html: attribution }}
        />
      </div>
      <div className={styles.icons}>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${name} ${address}`}
          target="_blank"
        >
          <CiCircleMore
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation(); //щоб не спрацьовував onClick для вибору місця
            }}
          />
        </Link>

        {/*Кнопка для перегляду 3д моделей*/}
        {/*<FaRegEye*/}
        {/*  className={styles.icon}*/}
        {/*  onClick={(e) => {*/}
        {/*    e.stopPropagation();*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default AttractionCard;
