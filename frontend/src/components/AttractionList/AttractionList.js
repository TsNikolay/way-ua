import React, { useState } from "react";
import AttractionCard from "../AttractionCard/AttractionCard";
import styles from "./AttractionList.module.css";
const AttractionList = ({ attractions }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      <div className={styles.list}>
        {attractions.slice(0, visibleCount).map((attraction) => {
          return (
            <AttractionCard key={attraction.place_id} attraction={attraction} />
          );
        })}
      </div>
      {visibleCount < attractions.length && (
        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Show More
        </button>
      )}
    </>
  );
};

export default AttractionList;
