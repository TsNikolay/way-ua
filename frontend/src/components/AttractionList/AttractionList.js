import React from "react";
import AttractionCard from "../AttractionCard/AttractionCard";
import styles from "./AttractionList.module.css";
const AttractionList = ({ attractions }) => {
  return (
    <div className={styles.list}>
      {attractions.map((attraction) => {
        return (
          <AttractionCard key={attraction.place_id} attraction={attraction} />
        );
      })}
    </div>
  );
};

export default AttractionList;
