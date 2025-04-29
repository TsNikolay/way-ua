import { Navigate, Outlet, useLocation } from "react-router-dom";

const PlannerPage = () => {
  const location = useLocation();

  // Якщо маршрут просто "/planner", робимо редирект
  if (location.pathname === "/planner" || location.pathname === "/planner/") {
    return <Navigate to="/planner/step1" replace />;
  }

  return (
    <div>
      {/* Спільна обгортка для всіх етапів */}
      <Outlet />
    </div>
  );
};

export default PlannerPage;
