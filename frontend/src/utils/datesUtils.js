import i18n from "../utils/translations/i18next";

export const getLocalISODate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getWeekday = (dateString) => {
  const currentLanguage = i18n.language;
  const localeMap = {
    en: "en-GB",
    uk: "uk-UA",
    de: "de-DE",
  };
  const locale = localeMap[currentLanguage] || "en-GB";

  const weekday = new Date(dateString).toLocaleDateString(locale, {
    weekday: "long",
  });
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return capitalized;
};

export const getTripDaysWeather = (weather, tripDates) => {
  if (!weather || tripDates.length === 0) return null;

  const [startISO, endISO] = tripDates.map(getLocalISODate);

  return weather.filter((day) => {
    const dayISO = getLocalISODate(day.dt * 1000); // переводимо з UNIX у мілісекунди
    return dayISO >= startISO && dayISO <= endISO;
  });
};

export const calculateTripDays = (dates) => {
  if (dates.length === 0) return null;
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);

  // Обнуляємо час, щоб уникнути похибок через годину/хвилини
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

export const getDayAndMonth = (dateString) => {
  const date = new Date(dateString);
  const months = i18n.t("months", { returnObjects: true });

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${month} ${day}`;
};
