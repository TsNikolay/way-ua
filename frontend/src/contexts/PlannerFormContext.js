import { createContext, useReducer } from "react";
import { hotelsRequest, attractionsRequest } from "../api/plannerApi";

const initialState = {
  stepEmojis: {
    0: "Step 1: 🗺️📅",
    1: "Step 2: 🏨🎡",
    2: "Step 3: 🌡️☀️",
  },
  page: 0,
  city: "",
  date: "",
  hotels: [],
  selectedHotel: null,
  attractions: [],
  selectedAttractions: [],
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
    case "SET_SELECTED_ATTRACTIONS":
      return { ...state, selectedAttractions: action.payload };
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

  const setSelectedHotel = (hotel) =>
    dispatch({ type: "SET_SELECTED_HOTEL", payload: hotel });

  const setSelectedAttractions = (attractions) =>
    dispatch({ type: "SET_SELECTED_ATTRACTIONS", payload: attractions });

  const resetForm = () => dispatch({ type: "RESET_FORM" });

  const getHotels = async (city, startDate, endDate) => {
    try {
      const response = await hotelsRequest(city, startDate, endDate);
      console.log(response);
      dispatch({ type: "SET_HOTELS", payload: response.hotels });
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const getAttractions = async (city, startDate, endDate) => {
    try {
      const response = await attractionsRequest(city, startDate, endDate);
      dispatch({ type: "SET_ATTRACTIONS", payload: response.attractions });
    } catch (err) {
      console.error("Error fetching attractions:", err);
    }
  };

  return (
    <PlannerFormContext.Provider
      value={{
        ...state,
        setPage,
        setCity,
        setDates,
        setSelectedHotel,
        setSelectedAttractions,
        resetForm,
        getHotels,
        getAttractions,
      }}
    >
      {children}
    </PlannerFormContext.Provider>
  );
};

export default PlannerFormContext;
