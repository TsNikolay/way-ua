import { createContext, useReducer } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../api/authApi";

const initialState = {
  user: null,
  isAuth: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    const response = await loginRequest(email, password);
    console.log(response.data);
    localStorage.setItem("token", response.data.accessToken);
    dispatch({ type: "LOGIN", payload: response.data.user });
  };

  const register = async (email, password, name, avatar_url) => {
    const response = await registerRequest(email, password, name, avatar_url);
    console.log(response);
    localStorage.setItem("token", response.data.accessToken);
    dispatch({ type: "REGISTER", payload: response.data.user });
  };

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
