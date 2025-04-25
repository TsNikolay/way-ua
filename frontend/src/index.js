import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { PlannerFormProvider } from "./contexts/PlannerFormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <UserProvider>
      <PlannerFormProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlannerFormProvider>
    </UserProvider>
  </AuthProvider>,
  // </React.StrictMode>,
);
