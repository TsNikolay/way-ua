import { createContext, useReducer } from "react";
import {
  hotelsRequest,
  attractionsRequest,
  weatherRequest,
  cityCoordinatesRequest,
} from "../api/plannerApi";

//Початковий стан або підтягуємо з локал стореджу (при наявності), або ж пусті значення
const initialState = {
  page: Number(localStorage.getItem("plannerPage")) || 0,
  city: JSON.parse(localStorage.getItem("selectedCity") || "{}"),
  date: JSON.parse(localStorage.getItem("selectedDates") || "[]"),
  hotels: JSON.parse(localStorage.getItem("plannerHotels") || "[]"),
  selectedHotel: JSON.parse(localStorage.getItem("selectedHotel") || "null"),
  attractions: JSON.parse(localStorage.getItem("plannerAttractions") || "[]"),
  selectedAttractions: JSON.parse(
    localStorage.getItem("selectedAttractions") || "[]",
  ),
  weather: JSON.parse(localStorage.getItem("plannerWeather") || "{}"),
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_DATES":
      return { ...state, date: action.payload };
    case "SET_HOTELS":
      return { ...state, hotels: action.payload };
    case "SET_SELECTED_HOTEL":
      return { ...state, selectedHotel: action.payload };
    case "SET_ATTRACTIONS":
      return { ...state, attractions: action.payload };
    case "SET_WEATHER":
      return { ...state, weather: action.payload };
    case "SET_SELECTED_ATTRACTIONS":
      return { ...state, selectedAttractions: action.payload };
    case "ADD_SELECTED_ATTRACTION":
      return {
        ...state,
        selectedAttractions: [...state.selectedAttractions, action.payload],
      };
    case "REMOVE_SELECTED_ATTRACTION":
      return {
        ...state,
        selectedAttractions: [
          ...state.selectedAttractions.filter(
            (attraction) => attraction.place_id !== action.payload.place_id,
          ),
        ],
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const PlannerFormContext = createContext({});

export const PlannerFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setPage = (pageNumber) => {
    localStorage.setItem("plannerPage", pageNumber);
    dispatch({ type: "SET_PAGE", payload: pageNumber });
  };

  const setCity = (city) => {
    dispatch({ type: "SET_CITY", payload: city });
  };

  const setDates = (dates) => {
    localStorage.setItem("selectedDates", JSON.stringify(dates));
    dispatch({ type: "SET_DATES", payload: dates });
  };

  const setHotels = (hotels) =>
    dispatch({ type: "SET_HOTELS", payload: hotels });

  const setAttractions = (attractions) =>
    dispatch({ type: "SET_ATTRACTIONS", payload: attractions });

  const setWeather = (weather) =>
    dispatch({ type: "SET_WEATHER", payload: weather });

  const setSelectedHotel = (hotel) => {
    localStorage.setItem("selectedHotel", JSON.stringify(hotel));
    dispatch({ type: "SET_SELECTED_HOTEL", payload: hotel });
  };

  const addSelectedAttraction = (attraction) => {
    localStorage.setItem(
      "selectedAttractions",
      JSON.stringify([...state.selectedAttractions, attraction]),
    );
    dispatch({ type: "ADD_SELECTED_ATTRACTION", payload: attraction });
  };

  const removeSelectedAttraction = (attraction) => {
    localStorage.setItem(
      "selectedAttractions",
      JSON.stringify(
        state.selectedAttractions.filter(
          (selectedAttraction) =>
            selectedAttraction.place_id !== attraction.place_id,
        ),
      ),
    );
    dispatch({ type: "REMOVE_SELECTED_ATTRACTION", payload: attraction });
  };

  const setSelectedAttractions = (attractions) => {
    localStorage.setItem("selectedAttractions", JSON.stringify(attractions));
    dispatch({ type: "SET_SELECTED_ATTRACTIONS", payload: attractions });
  };

  const resetForm = () => dispatch({ type: "RESET_FORM" });

  const getHotels = async (city) => {
    try {
      const response = await hotelsRequest(city);
      localStorage.setItem("plannerHotels", JSON.stringify(response.data));
      setHotels(response.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const getAttractions = async (city) => {
    try {
      const response = await attractionsRequest(city);
      localStorage.setItem("plannerAttractions", JSON.stringify(response.data));
      setAttractions(response.data);
    } catch (err) {
      console.error("Error fetching attractions:", err);
    }
  };

  const getWeather = async (latitude, longitude, numberOfDays) => {
    try {
      const response = await weatherRequest(latitude, longitude, numberOfDays);
      localStorage.setItem("plannerWeather", JSON.stringify(response.data));
      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const getCityCoordinates = async (city) => {
    try {
      const response = await cityCoordinatesRequest(city);

      localStorage.setItem(
        "selectedCity",
        JSON.stringify({ ...city, coordinates: response.data }),
      );
      setCity({ ...city, coordinates: response.data });
    } catch (err) {
      console.error("Error fetching coordinates:", err);
    }
  };

  const resetPlannerState = () => {
    resetPage();
    resetCity();
    resetDates();
    resetHotels();
    resetSelectedHotels();
    resetAttractions();
    resetSelectedAttractions();
  };

  const resetPage = () => {
    setPage(0);
    localStorage.removeItem("plannerPage");
  };

  const resetCity = () => {
    setCity({});
    localStorage.removeItem("selectedCity");
  };

  const resetDates = () => {
    setDates([]);
    localStorage.removeItem("selectedDates");
  };

  const resetHotels = () => {
    setHotels([]);
    localStorage.removeItem("plannerHotels");
  };

  const resetSelectedHotels = () => {
    setSelectedHotel(null);
    localStorage.removeItem("selectedHotel");
  };

  const resetAttractions = () => {
    setAttractions([]);
    localStorage.removeItem("plannerAttractions");
  };

  const resetSelectedAttractions = () => {
    setSelectedAttractions([]);
    localStorage.removeItem("selectedAttractions");
  };

  const resetWeather = () => {
    setWeather({});
    localStorage.removeItem("plannerWeather");
  };

  return (
    <PlannerFormContext.Provider
      value={{
        ...state,
        setPage,
        setCity,
        setDates,
        setHotels,
        setAttractions,
        setSelectedHotel,
        setSelectedAttractions,
        addSelectedAttraction,
        removeSelectedAttraction,
        resetForm,
        getHotels,
        getAttractions,
        resetPlannerState,
        getWeather,
        setWeather,
        resetPage,
        resetCity,
        resetDates,
        resetHotels,
        resetSelectedHotels,
        resetAttractions,
        resetSelectedAttractions,
        resetWeather,
        getCityCoordinates,
      }}
    >
      {children}
    </PlannerFormContext.Provider>
  );
};

export default PlannerFormContext;
