import Homepage from "./pages/Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import LocationDatesPage from "./pages/Planner/LocationDatesPage/LocationDatesPage";
import HotelsAttractionsPage from "./pages/Planner/HotelsAttractionsPage/HotelsAttractionsPage";
import WeatherPage from "./pages/Planner/WeatherPage/WeatherPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ReportPage from "./pages/Planner/ReportPage/ReportPage";
import RoutesPage from "./pages/RoutesPage/RoutesPage";
import RoutePage from "./pages/RoutePage/RoutePage";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import ContactsPage from "./pages/ContactsPage/ContactsPages";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const { i18n } = useTranslation();
  const { language, theme } = useContext(UserContext);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.classList.remove("en", "uk");
    document.documentElement.classList.add(language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/" element={<Homepage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/planner/step1" element={<LocationDatesPage />} />
          <Route path="/planner/step2" element={<HotelsAttractionsPage />} />
          <Route path="/planner/step3" element={<WeatherPage />} />
          <Route path="/planner/report" element={<ReportPage />} />

          {/* Private */}
          <Route element={<PrivateRoute />}>
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/routes/:id" element={<RoutePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
