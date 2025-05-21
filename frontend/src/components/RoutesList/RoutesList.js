import React from "react";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./RoutesList.module.css";
import { useNavigate } from "react-router-dom";

const RoutesList = ({ routesList }) => {
  const navigate = useNavigate();

  const handleGetRoute = async (routeId) => {
    navigate("/routes/" + routeId);
  };
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Tools</th>
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
                  <FaRegEdit className={styles.icon} title="Edit" />
                  <IoMdDownload className={styles.icon} title="Download" />
                  <FaEye
                    className={styles.icon}
                    title="View"
                    onClick={() => handleGetRoute(route.id)}
                  />
                  <MdDeleteOutline className={styles.icon} title="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesList;
