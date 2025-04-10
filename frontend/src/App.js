import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>

      {/*<LoginPage />*/}
    </>
  );
}

export default App;
