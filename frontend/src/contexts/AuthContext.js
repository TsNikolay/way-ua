import { createContext, useEffect, useReducer } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../api/authApi";
import axios from "axios";
import { API_URL } from "../api/axios";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
    case "REFRESH_TOKENS":
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
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({ type: "LOGOUT" }); // убрать isAuth = true, если токена вообще нет
        return;
      }

      try {
        // Здесь можно вызвать refresh даже если access истёк
        await refresh();
      } catch (err) {
        console.warn("Auth check failed:", err);
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginRequest(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "LOGIN", payload: response.data.user });
    } catch (err) {
      throw err;
    }
  };

  const register = async (email, password, name, avatar_url) => {
    try {
      const response = await registerRequest(email, password, name, avatar_url);
      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "REGISTER", payload: response.data.user });
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      throw err;
    }
  };

  const refresh = async () => {
    dispatch({ type: "LOADING", payload: true });
    try {
      //Тут викликаємо дефолтний аксіос (без нашого інтерсептора), бо потенційно токену може і не бути.
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "REFRESH_TOKENS", payload: response.data.user });
    } catch (err) {
      await logout();
    }
    dispatch({ type: "LOADING", payload: false });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
