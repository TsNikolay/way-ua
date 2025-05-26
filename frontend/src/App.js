import Homepage from "./pages/Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PlannerPage from "./pages/Planner/PlannerPage";

import LocationDatesPage from "./pages/Planner/LocationDatesPage";
import HotelsAttractionsPage from "./pages/Planner/HotelsAttractionsPage";
import WeatherPage from "./pages/Planner/WeatherPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ReportPage from "./pages/Planner/ReportPage";
import RoutesPage from "./pages/RoutesPage/RoutesPage";
import RoutePage from "./pages/RoutePage/RoutePage";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import UserContext from "./contexts/UserContext";

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
          <Route path="/" element={<Homepage />} />

          <Route path="/planner" element={<PlannerPage />}>
            <Route path="step1" element={<LocationDatesPage />} />
            <Route path="step2" element={<HotelsAttractionsPage />} />
            <Route path="step3" element={<WeatherPage />} />
            <Route path="report" element={<ReportPage />} />
          </Route>

          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:id" element={<RoutePage />} />
        </Route>
      </Routes>

      {/*<LoginPage />*/}
    </>
  );
}

export default App;
