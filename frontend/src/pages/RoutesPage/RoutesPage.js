import React, { useEffect, useState } from "react";
import styles from "../Planner/HotelsAttractionsPage.module.css";
import RoutesList from "../../components/RoutesList/RoutesList";
import { getRoutesRequest } from "../../api/routesApi";

const RoutesPage = () => {
  const [routesList, setRoutesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await getRoutesRequest();
        console.log(response);
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
      <h1 className={styles.title}>TRIPS</h1>
      <div className={styles.container}>
        <RoutesList routesList={routesList} />
      </div>
    </div>
  );
};

export default RoutesPage;
