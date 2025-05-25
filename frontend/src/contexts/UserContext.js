import { createContext, useReducer } from "react";

const initialState = {
  userInfo: null,
  language: localStorage.getItem("userLanguage") || "en",
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return { ...state, userInfo: action.payload };
    case "CLEAR_USER_INFO":
      return { ...state, userInfo: null };
    case "CLEAR_LANGUAGE":
      return { ...state, language: "en" };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUserInfo = (info) =>
    dispatch({ type: "SET_USER_INFO", payload: info });

  const setLanguage = (language) => {
    localStorage.setItem("userLanguage", language);
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const clearUserInfo = () => dispatch({ type: "CLEAR_USER_INFO" });
  const clearLanguage = () => {
    localStorage.removeItem("userLanguage");
    dispatch({ type: "CLEAR_LANGUAGE" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserInfo,
        clearUserInfo,
        setLanguage,
        clearLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
