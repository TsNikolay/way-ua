export const getLocalISODate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getWeekday = (dateString, locale = "en-UK") => {
  return new Date(dateString).toLocaleDateString(locale, { weekday: "long" });
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${month} ${day}`;
};
