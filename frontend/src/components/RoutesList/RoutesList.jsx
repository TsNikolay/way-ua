import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./RoutesList.module.css";
import { useNavigate } from "react-router-dom";
import { deleteRouteRequest } from "../../api/routesApi";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RoutesList = ({ routesList, setRoutesList }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = async (routeId) => {
    try {
      await deleteRouteRequest(routeId);
      setRoutesList((prev) => prev.filter((route) => route.id !== routeId));
    } catch (err) {
      console.error("Failed to delete route:", err);
    }
  };

  const handleGetRoute = async (routeId) => {
    navigate("/routes/" + routeId);
  };

  return (
    <div className={styles.tableContainer}>
      {routesList.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("routeslist.name")}</th>
              <th>{t("routeslist.dates")}</th>
              <th>{t("routeslist.status")}</th>
              <th>{t("routeslist.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {routesList.map((route) => (
              <tr key={route.id}>
                <td>{route.name}</td>
                <td>
                  {new Date(route.start_date).toLocaleDateString()} -{" "}
                  {new Date(route.end_date).toLocaleDateString()}
                </td>
                <td>{route.status}</td>
                <td>
                  <div className={styles.icons}>
                    <FaEye
                      className={styles.icon}
                      title="View"
                      onClick={() => handleGetRoute(route.id)}
                    />
                    <MdDeleteOutline
                      className={styles.icon}
                      title="Delete"
                      onClick={() => handleDelete(route.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className={styles.noTrips}>
          {t("routespage.no_planned_trips_yet")}
        </h3>
      )}
    </div>
  );
};

export default RoutesList;
