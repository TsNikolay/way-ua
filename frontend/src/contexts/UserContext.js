import { createContext, useReducer } from "react";

const initialState = {
  userInfo: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return { ...state, userInfo: action.payload };
    case "CLEAR_USER_INFO":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUserInfo = (info) =>
    dispatch({ type: "SET_USER_INFO", payload: info });

  const clearUserInfo = () => dispatch({ type: "CLEAR_USER_INFO" });

  return (
    <UserContext.Provider value={{ ...state, setUserInfo, clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
