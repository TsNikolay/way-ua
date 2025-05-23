class WeatherMapper {
  /**
   * Maps OpenWeatherMap API daily forecast item to DB model
   * @param {Object} apiItem - Single day forecast from API
   * @param {number|string} route_id - ID to associate the weather with a trip route
   * @returns {Object} DB-compatible weather record
   */
  apiToDb(apiItem, dayNumber) {
    const temperature = apiItem.temp.day;
    const conditions = `${apiItem.weather[0].main}: ${apiItem.weather[0].description}`;

    return {
      dt: apiItem.dt,
      day: dayNumber,
      temperature,
      conditions,
    };
  }

  /**
   * Maps OpenWeatherMap API daily forecast item to ViewModel
   * @param {Object} apiItem - Single day forecast from API
   * @returns {Object} ViewModel-compatible structure
   */
  apiToViewModel(apiItem) {
    return {
      dt: apiItem.dt,
      temp: {
        day: apiItem.temp.day,
      },
      weather: [
        {
          main: apiItem.weather[0].main,
          description: apiItem.weather[0].description,
          icon: apiItem.weather[0].icon,
        },
      ],
    };
  }

  /**
   * Maps a DB weather record to ViewModel
   * @param {Object} dbItem - DB weather record
   * @returns {Object} ViewModel-compatible structure
   */
  dbToViewModel(dbItem) {
    const [main, description] = dbItem.conditions
      .split(":")
      .map((s) => s.trim());
    const icon = this._guessIcon(main, description);

    return {
      dt: dbItem.dt,
      temp: {
        day: dbItem.temperature,
      },
      weather: [
        {
          main,
          description,
          icon,
        },
      ],
    };
  }

  /**
   * Determines the appropriate icon code based on weather condition
   * @private
   * @param {string} main - Main weather condition
   * @param {string} description - Weather description
   * @returns {string} Icon code
   */
  _guessIcon(main, description) {
    const condition = `${main.toLowerCase()}: ${description.toLowerCase()}`;

    const iconMapping = {
      "thunderstorm: light rain": "11d",
      "thunderstorm: rain": "11d",
      "thunderstorm: heavy rain": "11d",
      "thunderstorm: ragged": "11d",
      "thunderstorm: light drizzle": "11d",
      "thunderstorm: drizzle": "11d",
      "thunderstorm: heavy drizzle": "11d",
      "drizzle: light intensity": "09d",
      "drizzle: drizzle": "09d",
      "drizzle: heavy intensity": "09d",
      "drizzle: light rain": "09d",
      "drizzle: rain": "09d",
      "drizzle: heavy rain": "09d",
      "drizzle: shower rain": "09d",
      "drizzle: heavy shower rain": "09d",
      "drizzle: shower drizzle": "09d",
      "rain: light rain": "10d",
      "rain: moderate rain": "10d",
      "rain: heavy intensity rain": "10d",
      "rain: very heavy rain": "10d",
      "rain: extreme rain": "10d",
      "rain: freezing rain": "13d",
      "rain: light intensity shower rain": "09d",
      "rain: shower rain": "09d",
      "rain: heavy intensity shower rain": "09d",
      "rain: ragged shower rain": "09d",
      "snow: light snow": "13d",
      "snow: snow": "13d",
      "snow: heavy snow": "13d",
      "snow: sleet": "13d",
      "snow: light shower sleet": "13d",
      "snow: shower sleet": "13d",
      "snow: light rain and snow": "13d",
      "snow: rain and snow": "13d",
      "snow: light shower snow": "13d",
      "snow: shower snow": "13d",
      "snow: heavy shower snow": "13d",
      "mist: mist": "50d",
      "smoke: smoke": "50d",
      "haze: haze": "50d",
      "dust: sand/dust whirls": "50d",
      "fog: fog": "50d",
      "sand: sand": "50d",
      "dust: dust": "50d",
      "ash: volcanic ash": "50d",
      "squall: squalls": "50d",
      "tornado: tornado": "50d",
      "clear: clear sky": "01d",
      "clouds: few clouds": "02d",
      "clouds: scattered clouds": "03d",
      "clouds: broken clouds": "04d",
      "clouds: overcast clouds": "04d",
    };

    return iconMapping[condition] || "01d";
  }
}

export default new WeatherMapper();
