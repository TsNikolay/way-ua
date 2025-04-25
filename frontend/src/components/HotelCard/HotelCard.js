import React from "react";
import styles from "./HotelCard.module.css";

const HotelCard = ({ hotel }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const photoReference = hotel.photos[0].photo_reference;
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`;
  const htmlAttributions = hotel.photos[0].html_attributions;

  return (
    <div>
      <img style={{ width: "100px" }} src={imageUrl} alt="No photo" />
      <div
        className={styles.attribution}
        dangerouslySetInnerHTML={{ __html: htmlAttributions[0] }}
      />
    </div>
  );
};

export default HotelCard;
