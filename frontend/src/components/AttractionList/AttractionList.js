import React, { useState } from "react";
import AttractionCard from "../AttractionCard/AttractionCard";
import styles from "./AttractionList.module.css";
import { useTranslation } from "react-i18next";
const AttractionList = ({ attractions }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const { t } = useTranslation();
  if (!Array.isArray(attractions)) return null;

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
          {t("hotelsattractionspage.show_more")}
        </button>
      )}
    </>
  );
};

export default AttractionList;
