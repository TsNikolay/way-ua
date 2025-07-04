import React, { useEffect, useState } from "react";
import styles from "./RoutesPage.module.css";
import RoutesList from "../../components/RoutesList/RoutesList";
import { getRoutesRequest } from "../../api/routesApi";
import { useTranslation } from "react-i18next";

const RoutesPage = () => {
  const [routesList, setRoutesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await getRoutesRequest();
        setRoutesList(response.data.routes || response.data);
      } catch (err) {
        console.error("Failed to load routes:", err);
        setError("Failed to load routes");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return <div className={styles.container}>Routes loading...</div>;
  }
  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>{t("routeslist.trips")}</h1>
      <div className={styles.container}>
        <RoutesList routesList={routesList} setRoutesList={setRoutesList} />
      </div>
    </div>
  );
};

export default RoutesPage;
