import Homepage from "./pages/Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PlannerPage from "./pages/Planner/PlannerPage";

import LocationDatesPage from "./pages/Planner/LocationDatesPage";
import HotelsAttractionsPage from "./pages/Planner/HotelsAttractionsPage";
import WeatherPage from "./pages/Planner/WeatherPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/planner" element={<PlannerPage />}>
            <Route path="step1" element={<LocationDatesPage />} />
            <Route path="step2" element={<HotelsAttractionsPage />} />
            <Route path="step3" element={<WeatherPage />} />
          </Route>
        </Route>
      </Routes>

      {/*<LoginPage />*/}
    </>
  );
}

export default App;
