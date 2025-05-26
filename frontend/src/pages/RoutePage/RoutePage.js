import React, { useContext, useEffect, useRef, useState } from "react";
import { getRouteRequest } from "../../api/routesApi";
import styles from "./RoutePage.module.css";
import WeatherList from "../../components/WeatherList/WeatherList";
import { Link, useParams } from "react-router-dom";
import TripPlanList from "../../components/TripPlanList/TripPlanList";
import { calculateTripDays, getTripDaysWeather } from "../../utils/datesUtils";
import WeatherMapper from "../../mappers/weather.mapper";
import RouteDayMapper from "../../mappers/routeDay.mapper";
import html2pdf from "html2pdf.js";
import { IoMdDownload } from "react-icons/io";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/UserContext";

const RoutePage = () => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useContext(UserContext);
  const { id } = useParams();
  const pdfRef = useRef();
  const { t } = useTranslation();

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setLoading(true);
        const response = await getRouteRequest(id);

        if (response && response.data) {
          setRoute(response.data.route);
          console.log("[RoutePage] Route loaded:", response.data);
        } else {
          throw new Error("Route not found");
        }
      } catch (err) {
        console.error("[RoutePage] Error loading route:", err.message);
        setError("Failed to load route");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id]);

  //  Конвертація картинки в base64
  async function convertImageToBase64(url) {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Заміняємо всі img на base64
  async function prepareImagesInRef(ref) {
    const imgElements = ref.current.querySelectorAll("img");
    for (const img of imgElements) {
      try {
        const base64 = await convertImageToBase64(img.src);
        img.src = base64;
      } catch (err) {
        console.warn("Failed to convert image to base64:", img.src, err);
      }
    }
  }

  const handleDownloadPDF = async () => {
    if (pdfRef.current) {
      if (window.innerWidth < 1024) {
        pdfRef.current.classList.add("pdfMode");
      }

      pdfRef.current.classList.add("hideForPdf");

      const initialTheme = theme;
      if (initialTheme === "dark") {
        setTheme("light");
      }

      try {
        await prepareImagesInRef(pdfRef);

        const opt = {
          margin: 0,
          filename: `${route.name}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        await html2pdf().set(opt).from(pdfRef.current).save();
      } catch (error) {
        console.error("Error during PDF generation:", error);
      } finally {
        if (pdfRef.current.classList.contains("pdfMode")) {
          pdfRef.current.classList.remove("pdfMode");
        }

        setTheme(initialTheme);

        pdfRef.current.classList.remove("hideForPdf");
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Завантаження подорожі...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!route) {
    return (
      <div className={styles.error}>
        <h2>Подорож не знайдено</h2>
      </div>
    );
  }

  const cityShortLabel = route.city.split(",").slice(0, 2).join(",");
  const startDate = new Date(route.start_date).toLocaleDateString();
  const endDate = new Date(route.end_date).toLocaleDateString();
  const numberOfTripDays = calculateTripDays([
    route.start_date,
    route.end_date,
  ]);
  const weatherDaysView = route.weather.map((weatherDayDb) =>
    WeatherMapper.dbToViewModel(weatherDayDb),
  );

  const tripWeatherDaysView = getTripDaysWeather(weatherDaysView, [
    route.start_date,
    route.end_date,
  ]);

  const tripPlanView = {
    days: [],
  };

  if (route.route_days?.days?.length > 0) {
    const groupedByDay = new Map();

    route.route_days.days.forEach((entry) => {
      const activity = RouteDayMapper.dbToView(entry);
      const dayNumber = entry.day_number;

      if (!groupedByDay.has(dayNumber)) {
        groupedByDay.set(dayNumber, []);
      }

      groupedByDay.get(dayNumber).push(activity);
    });

    tripPlanView.days = Array.from(groupedByDay.entries())
      .sort(([a], [b]) => a - b)
      .map(([day_number, activities]) => ({
        day_number,
        activities,
      }));
  }

  return (
    <div>
      <h1 className={styles.title}>{t("routepage.your_travel_plan")}</h1>

      <div ref={pdfRef} className={styles.mainPdfWrapper}>
        <div className={styles.container}>
          <button onClick={handleDownloadPDF} className={styles.downloadButton}>
            {t("routepage.download_pdf")} <IoMdDownload />
          </button>

          <div className={styles.tripInfoContainer}>
            <div className={styles.tripInfo}>
              <div className={styles.nameInputContainer}>
                <h2>
                  {t("routepage.trip_title")}:{" "}
                  <span className={styles.infoValue}>{route.name}</span>
                </h2>
              </div>
              <div className={styles.infoValueContainer}>
                <h2>
                  🗺️ {t("routepage.city")}:{" "}
                  <span className={styles.infoValue}>{cityShortLabel}</span>
                </h2>
                <h2>
                  📅 {t("routepage.dates")}:{" "}
                  <span className={styles.infoValue}>
                    {startDate} - {endDate}
                  </span>
                </h2>
                <h2>
                  #️⃣ {t("routepage.days")}:{" "}
                  <span className={styles.infoValue}> {numberOfTripDays}</span>
                </h2>
              </div>
              <div className={styles.tripWeather}>
                <h2>⛅ {t("routepage.weather")}: </h2>
                <WeatherList weatherDays={tripWeatherDaysView} type="short" />
              </div>
            </div>
            <div className={styles.hotelCard}>
              <h2>{t("routepage.hotel")}:</h2>
              <div className={styles.hotelContent}>
                <div className={styles.hotelImageWrapper}>
                  <Link
                    to={`https://www.google.com/maps/search/?api=1&query=${route.hotel.name} ${route.hotel.address}`}
                    target="_blank"
                  >
                    <img
                      className={styles.hotelImage}
                      src={
                        `${API_URL}/planner/image?photo_reference=${route.hotel.photo_reference}` ||
                        "/images/default-hotel.png"
                      }
                      alt={route.hotel.name}
                      onError={(e) => {
                        e.target.src = "/images/default-hotel.png";
                      }}
                    />
                  </Link>
                </div>
                <div className={styles.hotelMapWrapper}>
                  <iframe
                    className={styles.hotelMap}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${route.hotel.google_place_id}`}
                  ></iframe>
                </div>
              </div>
              <h2 className={styles.hotelTitle}>{route.hotel.name}</h2>
              <h2 className={styles.hotelAddress}>{route.hotel.address}</h2>
            </div>
          </div>
          <div className={styles.tripPlan}>
            <h2 className={styles.tripPlanTitle}>
              📝 {t("routepage.trip_plan")}
            </h2>
            <TripPlanList trip={tripPlanView} />
          </div>

          <div className={styles.logo}>{t("footer.way_ua")}</div>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
