import { createContext, useReducer } from "react";
import {
  hotelsRequest,
  attractionsRequest,
  weatherRequest,
} from "../api/plannerApi";

const initialState = {
  stepEmojis: {
    0: "Step 1: 🗺️📅",
    1: "Step 2: 🏨🎡",
    2: "Step 3: 🌡️☀️",
  },
  page: 0,
  city: "",
  date: [],
  hotels: [],
  selectedHotel: null,
  attractions: [],
  selectedAttractions: [],
  weather: {}, //Пока не знаю что тут будет за тип
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

  const setPage = (pageNumber) =>
    dispatch({ type: "SET_PAGE", payload: pageNumber });

  const setCity = (city) => dispatch({ type: "SET_CITY", payload: city });

  const setDates = (dates) => dispatch({ type: "SET_DATES", payload: dates });

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
        ...state.selectedAttractions.filter(
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

  const resetPlannerState = () => {
    setPage(0);
    setHotels([]);
    setSelectedHotel(null);
    setAttractions([]);
    setSelectedAttractions([]);
    setWeather({});
    localStorage.removeItem("plannerHotels");
    localStorage.removeItem("selectedHotel");
    localStorage.removeItem("plannerWeather");
    localStorage.removeItem("plannerAttractions");
    localStorage.removeItem("selectedAttractions");
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
      }}
    >
      {children}
    </PlannerFormContext.Provider>
  );
};

export default PlannerFormContext;
